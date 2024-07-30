Feature: Memory

    As a player:
    - I want to play the classic memory game
    - So I want to match all the pairs of cards
    - and I need all the cards to have a pair
    
    How to refer to a card:
    - Using the (row, column) nomenclature
    - Rows and columns start from 1

    How to load the mock data
    - Using the <ctrl>+m keyboard combination to discover
      the load mock data form

    To define inline board mock data will use:
    "1" to "9" numbers to define card as pairs.
    "," as number separator
    "-" Row separator
    For example:
    "1,2,3-1,2,3"

    To define table board mock data will use:
    - | As separator
    For example:
      | 1 | 2 | 3 |
      | 2 | 1 | 3 |

    To define the board display will use:
    "." Unflipped card
    "1" to "9" numbers for flipped cards

    Game example: https://marina-ferreira.github.io/projects/js/memory-game/

    Background: 
        Given the player opens the game

    Scenario: Starting the game - Default board of 3x4
        Then the board should have "3" rows and "4" columns

    Scenario: Starting the game - All cards should be unflipped
        Then all cards should be unflipped   

    Scenario: Flipping a card - Clicking over a card
        Given the player loads the following mock data
        """
        | 1 | 1 |
        """
        When the player left clicks on the card ("1", "1")    
        Then the card ("1", "1") should be flipped

    Scenario: Flipping a card already flipped - Clicking over a card already flipped
        Given the player loads the following mock data
        """
        | 1 | 1 |
        """
        And the player left clicks on the card ("1", "1")  
        And the player left clicks on the card ("1", "1")    
        Then the card ("1", "1") should be flipped

    Scenario: Flipping two cards - Default scenario
        Given the player loads the following mock data
        """
        | 2 | 2 |
        | 1 | 1 |
        """
        And the player left clicks on the card ("1", "1") 
        When the player left clicks on the card ("1", "2")
        Then the card ("1", "1") and the card ("1", "2") should be flipped

    Scenario: Flipping two cards - Unflipping after not matching  
        Given the player loads the following mock data
        """
        | 2 | 1 |
        | 2 | 1 |
        """
        And the player left clicks on the card ("1", "1") 
        And the player left clicks on the card ("1", "2")
        When "3" seconds pass
        Then the card ("1", "1") and the card ("1", "2") should be unflipped

    Scenario:Flipping two cards - Flipping other cards after a match
        Given the player loads the following mock data
        """
        | 2 | 1 |
        | 1 | 2 |
        """
        And the card ("1", "1") and the card ("2", "2") are flipped
        When the player left clicks on the card ("2", "1")  
        Then the card ("2", "1") should be flipped
        Then the card ("1", "1") and the card ("2", "2") should be flipped