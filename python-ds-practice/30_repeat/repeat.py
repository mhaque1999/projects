def repeat(phrase, num):
    """Return phrase, repeated num times.

        >>> repeat('*', 3)
        '***'

        >>> repeat('abc', 2)
        'abcabc'

        >>> repeat('abc', 0)
        ''

    Ignore illegal values of num and return None:

        >>> repeat('abc', -1) is None
        True

        >>> repeat('abc', 'nope') is None
        True
    """

    counter = 0
    new_string = ""

    if not( isinstance(num, int) ):
        return None

    if num < 0:
        return None

    while counter < num:
        new_string += phrase
        counter += 1
    
    return new_string

