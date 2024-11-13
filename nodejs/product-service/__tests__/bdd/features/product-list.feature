Feature: Products List
    Scenario: Load the products list
        When we request the products list
        Then we should receive
            | name           | description            |    price  |
            | product 1       | product 1 description |    100    |
            | product 2       | product 1 description |    200    |
            | product 3       | product 1 description |    300    |