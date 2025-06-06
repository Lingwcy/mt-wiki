# VIT-DET -- 继承自原始VIT权重的目标检测网络[ICCV 2022]
![alt text](https://pic1.imgdb.cn/item/6830728c58cb8da5c80aac17.png)
## 前置知识
>**Neck（颈部）**
神经网络中的某一个特定模块,用于注入某一特定任务（目标检测、分割）所需要的先验知识（detection-specific prior knowledge），位于Backbone（骨干网络）和Head（头部）之间，​​并非所有模型都有显式Neck结构​​（如某些简单分类模型可能直接连接Backbone和Head）经典的Neck：例如FPN网络，通过多尺度特征融合，这对检测不同尺度物体有很大作用，Neck与backbone不同，骨干网常用来作为通用特征提取，适应于各种不同任务。

>**Head(头部)**
头通常位于神经网络模型中的尾部，用于生成某一特定任务的预测结果，如分类任务会利用全连接层映射分类个数，分割任务通过反卷积层恢复空间分辨率，生成逐像素掩码特定的 C*H*W 形状。

>**​​Translation-equivariant​​（平移等变性）**
输入平移（如物体位置变化）时，输出特征图相应平移，但保持语义不变。例如，CNN通过卷积操作天然具备这一特性。

>**Scale-equivariant​​（尺度等变性）**
输入尺度变化（如物体大小变化）时，输出特征能自适应调整，保持对目标的识别能力。传统方法依赖多尺度金字塔（如FPN）实现。

>**Global Self-Attention（全局自注意力）**
Transformer中的自注意力机制，允许每个位置关注全局信息，而非局部感受野（如CNN的卷积核）
在Vision Transformer（ViT）中，全局自注意力指每个图像块（token）需要与所有其他图像块计算关联性。例如，若输入图像被分为16x16个块，每个块需与其他255个块交互。

## 原始VIT在目标检测（分割...等下游任务）的缺陷
1.**高分辨率计算量暴增**.原始VIT骨干网最初用于图像分类任务，图像分类任务普遍不需要高分辨率图像作为数据集，但目标检测需处理高分辨率图像（1024x1024）以捕捉细节（如小物体），导致token数量远多于分类任务（如224x224图像仅196个token）。若Token数量极大（4096），每个token都需要与其他4095个token进行关联交互，计算量为O(n^2),会导致计算量爆炸式增长。直接应用原始ViT的全局自注意力会超出GPU显存限制，且无法满足实时性需求。

2.**原始VIT单尺度** 
若输入图像宽度为 224，每个 patch 的宽度为 16，那么水平方向上的patch数量为224/16=14,整张图片被分成14 x 14 个 token，由于所有Transformer层（如ViT-Base有12层）在输入于输出上并不会修改分辨率，无论经过多少层，特征的输出只是单尺度的。VIT原始的单尺度特征输出，在多尺度目标检测任务下效果并不理想。


## 作者目标
设计适用于下游任务的新型VIT--VITDET，不改变VIT本身的单尺度结构，从而能使用原始的VIT权重（已经从IMAGENET 1k中学到丰富的信息）微调VITDET，保留原始ViT的预训练架构权重，仅通过微调阶段的调整解决检测任务的多尺度与高分辨率问题。

关键词： 扩展预训练模型结构 、 目标检测

## 解决VIT单尺度问题 -- Simple feature pyramid
图像识别的下游任务（目标检测、语义分割）相比于分类往往需要在图中获取更多的信息（全局信息、局部信息、平移不变性、尺度等变性）。在以往传统的ConNet下游任务模型中（FPN,UNET，DEEPLAB），卷积天然具有隐含附带提取局部信息、平移不变性的能力，而全局信息、多尺度信息和尺度等变性信息往往通过特征金字塔网络（从骨干网中提取不同尺度的特征，并映射到相同的分辨率进行拼接）获取。但原始的VIT并不具有输出多尺度特征的能力，作者假设，VIT的默认维度为768层，已经包含了较为丰富的局部信息，同时通过VIT自带的token位置编码，VIT可能已经具有了平移等变性的能力。为了解决尺度等变性，作者提出Simple feature pyramid，利用ViT最后一层的单尺度特征图（步长16），通过反卷积和卷积操作生成多尺度金字塔（如步长4、8、16、32）。

## 解决高分辨图像输入原始VIT导致的计算量暴增 -- 窗口注意力 && 跨窗口块

**窗口注意力**:全局自注意力的计算复杂度与图像尺寸平方（O(N^2)）成正比，高分辨率输入（如1024x1024）时计算不可行。窗口注意力将特征图划分为​​非重叠局部窗口​​，仅在窗口内计算自注意力，复杂度降至O(M⋅K^2)（M为窗口数，K为窗口大小）。每个窗口内部独立计算自注意力，参数不共享，这样窗口内计算降低内存和计算消耗，适合高分辨率检测，但也导致了窗口之间不能计算特征的弊端。这种方法类似卷积，来捕获局部的特征。

**跨窗口块**
纯窗口注意力缺乏全局信息交互，可能导致窗口上下文丢失。需在局部计算中引入​​可控的全局交互​​。作者提出了两种解决办法：
1.全局注意力块​​：在部分Transformer块（如每6层插入1层）使用全局自注意力，覆盖整个特征图。
​2.​卷积块​​：插入残差卷积层（如3x3卷积），利用卷积的跨窗口感受野传播信息。
​策略：​跨窗口块均匀分布在骨干网络中（如ViT-L的24层中每6层插入1个全局块）。通过将模块初始化为恒等映射（初始权重全0），我们可以将这个模块插入到任何预训练模型的任何位置，而不会破坏预训练模型的初始状态。