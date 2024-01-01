def reverse_string(phrase):
    """Reverse string,

        >>> reverse_string('awesome')
        'emosewa'

        >>> reverse_string('sauce')
        'ecuas'
    """
    
    index = 0
    reversed_string = ""
    while( index  < len(phrase) ):
        reversed_string += phrase[len(phrase)-index-1]
        index += 1
    return reversed_string

