def min_max_keys(d):
    """Return tuple (min-keys, max-keys) in d.

        >>> min_max_keys({2: 'a', 7: 'b', 1: 'c', 10: 'd', 4: 'e'})
        (1, 10)

    Works with any kind of key that can be compared, like strings:

        >>> min_max_keys({"apple": "red", "cherry": "red", "berry": "blue"})
        ('apple', 'cherry')
    """

    first_iteration = True
    min_key = None
    max_key = None
    
    for element in d.keys():
        if first_iteration:
            min_key = element
            max_key = element
            first_iteration = False
            continue
        if element > max_key:
            max_key = element
        elif element < min_key:
            min_key = element
        else:
            pass

    return (min_key,max_key)
        
