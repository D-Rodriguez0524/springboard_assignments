def vowel_count(phrase):
    """Return frequency map of vowels, case-insensitive.

        >>> vowel_count('rithm school')
        {'i': 1, 'o': 2}

        >>> vowel_count('HOW ARE YOU? i am great!') 
        {'o': 2, 'a': 3, 'e': 2, 'u': 1, 'i': 1}
    """
    VOWELS = set("aeiou")
    phrase = phrase.lower()
    freq_counter = {}

    for ltr in phrase:
        if ltr in VOWELS:
            freq_counter[ltr] = freq_counter.get(ltr, 0)+1
    return freq_counter
