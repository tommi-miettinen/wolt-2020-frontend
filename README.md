# Wolt Summer 2020 - Frontend Engineering Pre-assignment 


![kuva](https://github.com/tommi-miettinen/wolt-2020-frontend/assets/63008431/ef8dc4a5-4b6c-4132-9569-daccae9bca43)


## Specification

### Overview

A list of restaurants is an important element in Wolt app. Depending on where our customers are located, they will be able to order food from few dozen or even from hundreds of different restaurants. Views in the app (_Discovery, Search, Delivers, Nearby_) sort restaurants based on the delivery time, popularity, rating and various other factors when trying to find the most relevant matches for each customer.  

Your task is to either display a list of restaurant using the given data set ([Option 1](#option1)) **OR** create an API that allows searching restaurants from the data set ([Option 2](#option2)).

Fun fact: the data set contains real Wolt restaurants, so we actually use a very similar json-format internally.

### Restaurant data

_restaurant.json_ contains fifty restaurants from central Helsinki area. Each object has a set fields providing more information about the restaurant, like _name_, _image_ and _location_. 

Example:

    {
        "city": "Helsinki",
        "currency": "EUR",
        "delivery_price": 390,
        "description": "Japanilaista ramenia parhaimmillaan",
        "image": "https://prod-wolt-venue-images-cdn.wolt.com/5d108aa82e757db3f4946ca9/d88ebd36611a5e56bfc6a60264fe3f81",
        "location": [
            24.941786527633663,
            60.169934599421396
        ],
        "name": "Momotoko Citycenter",
        "online": false,
        "tags": [
            "ramen",
            "risotto"
        ],
        "blurhash": "j2DUFG8jbu8AXuLIT5Tt0B01R2;;",
    }

Fields: 

- _city_ : A city where the restaurant is located (type: _string_)
- _currency_: ISO 4217 code of the currency the restaurant is using (type: _string_)
- _delivery price_: Delivery cost from the restaurant to a customer. The price is stored as subunits, so 390 in this case would be 3.90€ (type: _integer_)
- _description_: More information about what kind of restaurant it is (type: _string_)
- _image_: A link to restaurant's image (type: _string_)
- _location_: Restaurant's location in latitude & longitude coordinates. First element in the list is the longitude (type: a list containing two decimal elements)
- _name_: The name of the restaurant (type: _string_)
- _online_: If _true_, the restaurant is accepting orders at the moment. If _false_, then ordering is not possible (type: _boolean_)
- _tags_: A list of tags describing what kind of food the restaurant sells, e.g. pizza / burger (type: a list of strings, max.  3 elements)
- _blurhash_ : See [bonus task](#bonus)

### The task
Build a web page that shows all fifty restaurants. You can freely decide which fields to utilize from restaurants objects, so no need to put all the data visible. However, please use **at least three** fields.

There are no restrictions on design, so restaurants can be displayed vertically, horizontally, on a grid or however you decide. Aim for clear and responsive design.

In addition of rendering restaurants, create a possibility to sort restaurants alphabetically in ascending **and** descending order, e.g. by adding a _sort_-button on the top of the list.

Below is an example how the user interface could look like:

[![frontend.png](https://i.postimg.cc/0yHwwJkH/frontend.png)](https://postimg.cc/9DZ030qG)

    
### Bonus task: Blurhash
<a name="bonus"></a>
Restaurant data also includes a field called _blurhash_. As a bonus task you can figure out what this field is and use it: 
- In frontend task you can render the blurhash data
- In backend task you can e.g. validate that _blurhash_-field is correct when loading data from _restaurant.json_

There are some ready-made libraries for manipulating _blurhash_ values. Feel free use those or create your own one.

Bonus task is completely optional and it doesn't affect how we review assignments. It exists only for fun! 😀
