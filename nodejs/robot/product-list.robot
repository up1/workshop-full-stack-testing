*** Settings ***
Library           Collections
Library           OperatingSystem
Library           RequestsLibrary

*** Variables ***
${API_URL}        http://localhost:3002/api/products  # Replace with your API endpoint
${ACCESS_TOKEN}   YOUR_ACCESS_TOKEN  # Replace with your access token

*** Test Cases ***
Load The Products List
    Given The products list API is available
    When We request the products list
    Then We should receive the expected product details

*** Keywords ***
Given The products list API is available
    [Documentation]    Verify that the products list API endpoint is accessible
    Create Session    ProductsAPI    ${API_URL}

When We request the products list
    [Documentation]    Send a request to the products list API
    ${headers}=    Create Dictionary    x-access-token=${ACCESS_TOKEN}
    ${response}=    GET On Session    ProductsAPI    /   headers=${headers}
    Should Be Equal As Strings    ${response.status_code}    200
    # assign to variable for later use
    Set Suite Variable    ${response}
    FOR  ${product}  IN  @{response.json()}
        Log  ${product}
    END

Then We should receive the expected product details
    [Documentation]    Verify the response contains the expected product details
    ${expected_products}=    Create List
    ...    {"id": 1, "name": "product 1", "description": "product 1 description", "price": 100}
    ...    {"id": 2, "name": "product 2", "description": "product 2 description", "price": 200}
    ...    {"id": 3, "name": "product 3", "description": "product 3 description", "price": 300}
    FOR    ${expected_product}    IN    @{expected_products}
        ${match}=    Evaluate    any(product == ${expected_product} for product in @{response.json()})
        Should Be True    ${match}
    END