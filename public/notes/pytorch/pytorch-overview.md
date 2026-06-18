# PyTorch

> Deep learning framework

## Tensors

```python
import torch

# Create tensor
x = torch.tensor([1, 2, 3])
x = torch.randn(3, 4)       # Random normal
x = torch.zeros(3, 4)
x = torch.ones(3, 4)

# Operations
y = x + 2
z = torch.matmul(x, y.t())
```

## Autograd

```python
x = torch.tensor([1.], requires_grad=True)
y = x ** 2
y.backward()
print(x.grad)  # tensor([2.])
```

## Neural Network

```python
import torch.nn as nn

class Net(nn.Module):
    def __init__(self):
        super().__init__()
        self.fc1 = nn.Linear(784, 128)
        self.fc2 = nn.Linear(128, 10)
    
    def forward(self, x):
        x = torch.relu(self.fc1(x))
        x = self.fc2(x)
        return x

model = Net()
```

## DataLoader

```python
from torch.utils.data import DataLoader, TensorDataset

dataset = TensorDataset(X_train, y_train)
loader = DataLoader(dataset, batch_size=32, shuffle=True)

for batch_x, batch_y in loader:
    # Train
    pass
```

## GPU

```python
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)
x.to(device)
```