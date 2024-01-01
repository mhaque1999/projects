def is_palindrome(phrase):
    """Is phrase a palindrome?

    Return True/False if phrase is a palindrome (same read backwards and
    forwards).

        >>> is_palindrome('tacocat')
        True

        >>> is_palindrome('noon')
        True

        >>> is_palindrome('robert')
        False

    Should ignore capitalization/spaces when deciding:

        >>> is_palindrome('taco cat')
        True

        >>> is_palindrome('Noon')
        True
    """
    strlist = list(phrase)
    strlist.reverse()
    #print(strlist)
    reversed_string = "".join(strlist)
    #reversed_string

    #print(reversed_string)
    if reversed_string.replace(" ", "").lower() == phrase.replace(" ", "").lower():
        #print(True)
        return True
    #print(False)
    return False

is_palindrome('tacocat')
is_palindrome('noon')
is_palindrome('robert')
is_palindrome('taco cat')
is_palindrome('Noon')