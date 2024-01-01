def valid_parentheses(parens):
    """Are the parentheses validly balanced?

        >>> valid_parentheses("()")
        True

        >>> valid_parentheses("()()")
        True

        >>> valid_parentheses("(()())")
        True

        >>> valid_parentheses(")()")
        False

        >>> valid_parentheses("())")
        False

        >>> valid_parentheses("((())")
        False

        >>> valid_parentheses(")()(")
        False
    """

    paren_dic = {}
    counter = 0
    parens_list = list(parens)
    for parenthesis_index in range(len(parens_list)):
        if parens_list[parenthesis_index] == "(":
            paren_dic[f"( {counter}"] = "False"
            counter += 1
        if (parens_list[parenthesis_index] == ")"):
            if not(paren_dic.get(f"( {counter - 1}")):
                return False
            else:
                paren_dic.pop(f"( {counter - 1}")
                counter -= 1
    if paren_dic:
        return False
    return True

