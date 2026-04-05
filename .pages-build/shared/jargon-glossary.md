---
layout: default
---

# Student Coding Jargon Glossary

This glossary explains coding words that are not everyday vocabulary yet.
Use this any time you see a word that sounds technical.

## How To Read Each Entry
- Term: the jargon word
- Plain meaning: what it means in simple language
- Quick example: how it appears in coding class

## A

### algorithm
Plain meaning: A step-by-step plan to solve a problem.
Quick example: "First read input, then check conditions, then print result."

### argument
Plain meaning: A value you send into code so it can use that value.
Quick example: In `int("42")`, `"42"` is the argument.

## B

### boolean
Plain meaning: A value that can only be `True` or `False`.
Quick example: `is_ready = True`

### bug
Plain meaning: A mistake in your code.
Quick example: You expected score `50` but printed `5`.

## C

### condition
Plain meaning: A true/false test used to make decisions.
Quick example: `if score >= 50:`

### constraint
Plain meaning: A rule or limit you must follow.
Quick example: "Do not use loops in Lessons 1-6."

## D

### data type
Plain meaning: The kind of data a value is.
Quick example: `13` is `int`, `"Ari"` is `str`.

### debug
Plain meaning: Find and fix mistakes in code.
Quick example: Add print lines to check what values your variables hold.

## E

### edge case
Plain meaning: A boundary or unusual input that can break your logic.
Quick example: If pass mark is 50, test `49`, `50`, and `51`.

### exception
Plain meaning: An error Python raises while running.
Quick example: `int("cat")` raises `ValueError`.

## F

### function
Plain meaning: A named block of code that does one job.
Quick example: `print()` and `len()` are built-in functions.

## I

### index
Plain meaning: The position of an item in a list.
Quick example: In `["a", "b", "c"]`, index `0` is `"a"`.

### input
Plain meaning: Data given to your program.
Quick example: User types a number after `input("Enter score: ")`.

## J

### jargon
Plain meaning: Special words used by a subject area.
Quick example: Words like "edge case" and "unit test" are coding jargon.

## L

### logic
Plain meaning: The decision rules in your code.
Quick example: Choosing High/Medium/Low based on score ranges.

## O

### output
Plain meaning: What your program shows or returns.
Quick example: `print("Mission complete")`

## P

### parameter
Plain meaning: A named input placeholder used by a function.
Quick example: In `def greet(name):`, `name` is a parameter.

### pseudocode
Plain meaning: Human-readable planning steps before real code.
Quick example: "Repeat until user enters stop."

## R

### refactor
Plain meaning: Improve code structure without changing what it does.
Quick example: Rename unclear variables to clearer names.

### runtime error
Plain meaning: An error that happens when the program is running.
Quick example: Dividing by zero.

## S

### syntax
Plain meaning: The grammar rules of Python.
Quick example: Missing `:` after `if` causes a syntax error.

### syntax error
Plain meaning: Code grammar is invalid, so Python cannot run it.
Quick example: `if score > 10` with no colon.

## T

### test case
Plain meaning: One specific input and expected result used to check code.
Quick example: Input `8`, expect output `"High"`.

### traceback
Plain meaning: The error report that shows where code failed.
Quick example: It lists the file and line number with the error type.

## U

### unit test
Plain meaning: A small automatic test for one part of code.
Quick example: A test that checks one function returns the correct value.

## V

### variable
Plain meaning: A named storage box for data.
Quick example: `team = "Raven"`

## Quick Confusions

- test case vs unit test:
  A test case is one check you design.
  A unit test is code that runs checks automatically.
- bug vs error:
  A bug is your mistake in logic or code.
  An error is what Python reports when something fails.
- edge case vs normal case:
  Normal case is common input.
  Edge case is boundary or unusual input.

## Fast Student Checklist

Before submitting code, ask:
1. Did I test at least one normal case?
2. Did I test at least one edge case?
3. If there is an error, did I read the traceback line number?
4. Can I explain my algorithm in 2-3 clear steps?
