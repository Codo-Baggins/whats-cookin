const recipeTestData = [
  {
    "id": 595736,
    "image": "https://spoonacular.com/recipeImages/595736-556x370.jpg",
    "ingredients": [
      {
        "id": 11477,
        "quantity": {
          "amount": 3,
          "unit": "c"
        }
      },
      {
        "id": 11297,
        "quantity": {
          "amount": 4,
          "unit": "tsp"
        }
      },
      {
        "id": 1082047,
        "quantity": {
          "amount": 7,
          "unit": "large"
        }
      }
    ],
    "instructions": [
      {
        "instruction": "In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy.",
        "number": 1
      },
      {
        "instruction": "Add egg and vanilla and mix until combined.",
        "number": 2
      }
    ],
    "name": "Loaded Chocolate Chip Pudding Cookie Cups",
    "tags": [
      "antipasti",
      "starter",
      "snack",
      "appetizer",
      "antipasto",
      "hor d'oeuvre"
    ]
  }, {     
    "id": 84537,
    "image": "words",
    "ingredients": [
      {
        "id": 11477,
        "quantity": {
          "amount": 5,
          "unit": "c"
        }
      },
      {
        "id": 11297,
        "quantity": {
          "amount": 6,
          "unit": "tsp"
        }
      },
      {
        "id": 1082047,
        "quantity": {
          "amount": 9,
          "unit": "large"
        }
      }
    ],
    "instructions": [
      {
        "instruction": "Do this",
        "number": 1
      },
      {
        "instruction": "Do that.",
        "number": 2
      }
    ],
    "name": "Other Food",
    "tags": [
      "antipasti",
      "starter",
      "snack",
      "appetizer",
      "antipasto",
      "hor d'oeuvre"
    ]

  }
]

if (typeof module !== 'undefined') {
  module.exports = recipeTestData;
}