export const allModels = [
  { value: 'gpt-4o', label: 'gpt-4o', 
    initialMessage: "In this example, both the `Dog` and `Cat` classes inherit from the `Animal` class and override the `speak` method with their own implementations. When calling `speak` on an instance of `Dog` or `Cat`, the appropriate implementation is invoked based on the actual type of the object." },
  { value: 'gpt-3.5-turbo', label: 'gpt-3.5-turbo', 
    initialMessage: "Here's an example of operator overloading in Python:\n\n```python\nclass Point:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n\n    def __add__(self, other):\n        return Point(self.x + other.x, self.y + other.y)\n\np1 = Point(1, 2)\np2 = Point(3, 4)\n\np3 = p1 + p2  # Overloading the + operator\nprint(p3.x, p3.y)  # Output: 4 6\n```" },
  { value: 'claude-3-5-sonnet-20240620', label: 'claude-3.5-sonnet', 
    initialMessage: "Here's an example of polymorphism in Python:\n\n```python\nclass Animal:\n    def make_sound(self):\n        pass\n\nclass Dog(Animal):\n    def make_sound(self):\n        print('Woof!')\n\nclass Cat(Animal):\n    def make_sound(self):\n        print('Meow!')\n\nanimals = [Dog(), Cat()]\nfor animal in animals:\n    animal.make_sound()  # Calls the overridden method based on the object's class\n```" },
  { value: 'claude-3-haiku-20240307', label: 'claude-3-haiku', 
    initialMessage: "Hello! How can I assist you today? 😊" },
  { value: 'gemini-1.5-pro', label: 'gemini-1.5-pro', 
    initialMessage: "Hello! How can I assist you today? 😊" }, 
  { value: 'gemini-1.5-flash', label: 'gemini-1.5-flash', 
    initialMessage: "Hello! How can I assist you today? 😊" }
  // { value: 'Perplexity', label: 'Perplexity', initialMessage: "Here's an example of the Template Method pattern in Python:\n\n```python\nclass Animal:\n    def speak(self):\n        raise NotImplementedError('Subclass must implement this method')\n\nclass Dog(Animal):\n    def speak(self):\n        return 'Woof!'\n\nclass Cat(Animal):\n    def speak(self):\n        return 'Meow!'\n\n# Create a list of Animal objects\nanimals = [Dog(), Cat()]\n\n# Call the speak method on each object\nfor animal in animals:\n    print(animal.speak())\n```" },
  // { value: 'Llama 2', label: 'Llama 2', initialMessage: "In object-oriented programming, the `speak` method is often used as an example of polymorphism. The `Dog` and `Cat` classes, which inherit from `Mammal`, override the `speak` method with their own specific sounds. When we create instances of `Dog` and `Cat` and call the `speak` method on each instance, the correct sound is produced for each animal." },
];
