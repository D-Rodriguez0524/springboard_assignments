"""Python serial number generator."""


class SerialGenerator:
    """Machine to create unique incrementing serial numbers.

    >>> serial = SerialGenerator(start=100)

    >>> serial.generate()
    100

    >>> serial.generate()
    101

    >>> serial.generate()
    102

    >>> serial.reset()

    >>> serial.generate()
    100
    """

    def __init__(self, start=0):
        """making new serial generator starting at the start point """
        self.start = self.next = start

    def generate(self):
        """generating the next number"""
        self.next += 1
        return self.next - 1

    def reset(self):
        """resetting number to the original start number"""
        self.next = self.start
