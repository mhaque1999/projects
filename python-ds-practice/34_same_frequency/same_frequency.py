def same_frequency(num1, num2):
    """Do these nums have same frequencies of digits?
    
        >>> same_frequency(551122, 221515)
        True
        
        >>> same_frequency(321142, 3212215)
        False
        
        >>> same_frequency(1212, 2211)
        True
    """

    frequency1 = create_frequency_dict(num1)
    frequency2 = create_frequency_dict(num2)

    if frequency1 == frequency2:
        return True

    return False


def create_frequency_dict(num):
    frequency = {}
    for number in str(num):
        if not(frequency.get(number)):
            frequency[number] = 1
        else:
            frequency[number] = frequency.get(number) + 1
    
    return frequency

