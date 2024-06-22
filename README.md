<h1>
    <span style='color: #F2613F; font-weight: 800; font-size: 60px'>Sudoku</span>
    <span style='color: #CAF4FF; font-weight: 700'>In</span>
    <em><span style='color: #75C2F6; font-weight: 700'>React</span></em>
</h1>

# Developer Information
> Hello, I am **Aryan Garg**, CS undergrad, currently pursuing B.Tech in VIT, Vellore. I am fond of Web development. I have a basic understanding of MERN stack as well as PERN stack.

### Project Motivation
---
> **MFC :** __Mozilla FireFox Club__  
This project is part of **MFC** *Mini Games* project.


# Project Details
## Idea
> Sudoku game that has options to select difficulty of the game, options for hints or to make notes, times and ratings based on time taken and errors made.

## Features
- ### Storing Game Progress
  > **Local Storage Magic**  
  All the game data is stored in a central state in an atom using recoil, from there it is supplied to all the components within the application. Whenever there is change in the state, the state is saved to browser's local storage, so that on reload, game is loaded with the previous state.
- ### 2 Ways To Play
    > **Reimagined the way you think while playing the game** 

    There are 2 ways, you can play this game
    1. **Fill the Number**   
         > *First Select the number*, then the sqaure in which number is already there will be displayed with highlight sqaures toggled on and you can figure out the square where this number can be placed.  
         Also there is highlight moves option which highlight the squares where that number can be placed.
    2. Fill the Square
         > *First Select the square* on board, then the all the concerned sqaures will be highlighted i.e. square on the column, row, and box with highlight sqaures toggled on, which allows you to figure out which numbers have been placed and which numbers can be.  
         Also, there is highlight moves option which will highlight the number which can be placed on the sqaure when toggled on.
            
        


    



