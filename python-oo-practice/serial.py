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
    def __init__(self,start):
        """ Creates a serial generator with a start number"""
        self.start = start - 1
        self.current = start - 1

    def generate(self):
        """ Increments the current number by 1""" 
        self.current += 1
        return self.current

    def reset(self):
        """ Resets the current number back to the start number"""
        self.current = self.start
        
    def __repr__(self):
        """ string representation of the serial generator"""
        return f"SerialGenerator start = {self.start + 1} next = {self.current + 1}"

