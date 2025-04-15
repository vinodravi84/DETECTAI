# models/model.py
import torch.nn as nn
from torchvision.models import resnet18

class CIFARResNet18(nn.Module):
    def __init__(self, num_classes=100):
        super().__init__()
        self.model = resnet18(weights=None)
        self.model.conv1 = nn.Conv2d(3, 64, kernel_size=3, stride=1, padding=1, bias=False)
        self.model.maxpool = nn.Identity()
        self.model.fc = nn.Linear(512, num_classes)

    def forward(self, x):
        return self.model(x)

def get_model():
    return CIFARResNet18()
