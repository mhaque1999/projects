def capitalize(phrase):
    """Capitalize first letter of first word of phrase.

        >>> capitalize('python')
        'Python'

        >>> capitalize('only first word')
        'Only first word'
    """
    cap_phrase = list(phrase.split(" "))
    

    #for index in range(len(cap_phrase)):
        #print(cap_phrase[index])
    cap_phrase[0] = ( cap_phrase[0].replace( cap_phrase[0][0], cap_phrase[0][0].upper() ) )
        
    cap_string = " ".join(cap_phrase)
    return cap_string

