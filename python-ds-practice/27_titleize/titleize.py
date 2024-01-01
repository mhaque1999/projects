def titleize(phrase):
    """Return phrase in title case (each word capitalized).

        >>> titleize('this is awesome')
        'This Is Awesome'

        >>> titleize('oNLy cAPITALIZe fIRSt')
        'Only Capitalize First'
    """

    title_list = list(phrase.split(" "))
    string_filler = ""
    for word_index in range( len(title_list) ):
        word = title_list[word_index]

        for index in range(len( title_list[word_index] ) ):
            
            if index == 0:
                word = word.replace(word[0], word[0].upper(), 1)
            else:
                word = word.replace(word[index], word[index].lower(), 1)

        title_list[word_index] = word

    string_filler = " ".join(title_list)
    return string_filler

