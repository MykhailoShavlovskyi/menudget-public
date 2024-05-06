# Menudget CMS redesign

# Intro
**Menudget CMS** is made for 3 types of users: **Admins** (people from Menudget) that have access to all functionality in the CMS, **Managers** (Restaurants managers) that only have access to things related to their restaurant, **Waiters** that have access to order management functionally.

Menudget CMS requires a UX/UI redesign, current implementation is a prototype and its design choices can be mostly ignored. Page screenshots of the current implementation are provided in the document just to have a reference of what functionality should exist. Additional functionality can be designed if it makes sense to have, for example, list of managers shows manager emails and names, designer can also add user thumbnails to the list. Another example, currently there is a logout button on the navbar, designer can decide to make a whole user info panel and add logout button to the panel.

Design should be responsive and work with **tablet** and **PC**. Phone design is not needed.

User accounts to login into the CMS (http://test.menudget.com/cms/auth/login):
- Admin
  - Email: admin@menudget.com
  - Password: test
- Manager
  - Email: manager@menudget.com
  - Password: test
- Waiter
  - Email: waiter@menudget.com
  - Password: test

Please only create/edit/delete data in restaurant 'Test restaurant' (id: 1)

* * *


# 1. Auth pages
Auth pages contain **login** and **restoring password** functionality. There is no registration functionality, it is not needed.

## Login page
Login page should contain inputs for **email** and **name**, **link** to forgot password page, **login** **button**. There also should be 3 buttons to log in with **Google**, **Facebook**, **Apple** .If users enters invalid email an **error** should appear on the input. If user fails to login an **error** should be shown for the whole form.

##### Current URL:
http://test.menudget.com/cms/auth/login

##### Current implementation:
![login.png](https://d31t95zge1f2me.cloudfront.net/redesign/login.png)

![login-error.png](https://d31t95zge1f2me.cloudfront.net/redesign/login-error.png)

![login-error-2.png](https://d31t95zge1f2me.cloudfront.net/redesign/login-error-2.png)

## Forgot password page
Forgot password page should contain an **email** input and a submit **button**. If users invalid email an **error** should be shown. After submitting a **confirmation message** should be shown.

##### Current URL:
http://test.menudget.com/cms/auth/forgot-password

##### Current implementation:
![forgot.png](https://d31t95zge1f2me.cloudfront.net/redesign/forgot.png)

![forgot-error.png](https://d31t95zge1f2me.cloudfront.net/redesign/forgot-error.png)

![forgot-confirm.png](https://d31t95zge1f2me.cloudfront.net/redesign/forgot-confirm.png)

* * *

# 2. Restaurants pages
Restaurants pages allow **admins** to **create/edit/delete** restaurants. **Managers** can only **edit** their restaurant info. Waiters have no access to these pages.


## Restaurants page
Restaurants page is only accessible for **admins**. This page displays all registered restaurants. From this page admin can select a restaurant in order to **edit** it. Admin can also **create** new restaurants.

##### Current URL:
http://test.menudget.com/cms/restaurants

##### Current implementation:
![restaurants.png](https://d31t95zge1f2me.cloudfront.net/redesign/restaurants.png)

## Create restaurant page
On this page **admins** can fill in a **form** with restaurant data to create a new restaurant. Form should contain inputs for **name**, **description**, restaurant **manager email**, **opening times** for each day of the week, **closing times** for each day of the weak. Restaurant **logo** and **banner** images can be uploaded into this form. Finally, form should have a submit **button**. **Errors** should appear if input has wrong input or form was rejected by server. This page should also contain image of the phone with **preview** of how restaurants screen will look like in the app; this feature does not exist in current implementation.

##### Current URL:
http://test.menudget.com/cms/restaurants/new

##### Current implementation:
![create-restaurant.png](https://d31t95zge1f2me.cloudfront.net/redesign/create-restaurant.png)

## Edit restaurant page
On this page **admins** and **managers** can edit existing restaurant info. It contains the **same inputs** and **preview** as 'Create restaurant page'. Current implementation also has a **delete button** on this page which is only accessible for admins. Pressing this button open a **confirmation modal**. Confirmation modal contains an **input field** in which user have to enter restaurant name in order to enable the **delete button**, modal also contains cancel button. Confirming the deletion another modal shows up, it shows a **message**: "Are you sure you want to delete?", **yes** and **no** buttons.


##### Current URL:
http://test.menudget.com/cms/restaurants/1

##### Current implementation:
![edit-restaurant.png](https://d31t95zge1f2me.cloudfront.net/redesign/edit-restaurant.png)

![delete-restaurant.png](https://d31t95zge1f2me.cloudfront.net/redesign/delete-restaurant.png)

* * *

# 3. Dishes pages
Dishes pages allow **admins** and **managers** to **create/edit/delete** dishes categories and dishes.

## Dishes page
Dishes page is accessible for **admins** and **managers**. Dishes page displays all dishes of a restaurant grouped by dish category.

From this page user can select a category to edit its **name**; and select a dish in order to **edit** its data.

User can also request to **create** a new category or dish from this page. User can move categories **up and down**, as well as moving dishes **left/right** within a category. Dish can be **assigned** to a different category by dragging it on the target category.

Admins can select **what restaurant** dishes they see.

##### Current URL:
http://test.menudget.com/cms/dishes/1

##### Current implementation:
![dishes.png](https://d31t95zge1f2me.cloudfront.net/redesign/dishes.png)

## Create category page
On this page **admins** and **managers** can fill in a **form** with category **name** to create a new category. Form should have a submit **button**. **Errors** should appear if input has wrong input or form was rejected by server.

##### Current URL:
http://test.menudget.com/cms/dishes/1/category/new

##### Current implementation:
![new-category.png](https://d31t95zge1f2me.cloudfront.net/redesign/new-category.png)

## Edit category page
On this page **admins** and **managers** can edit existing category **name**. Current implementation also has a **delete button** on this page. Pressing this button opens a **confirmation modal**.

##### Current URL:
http://test.menudget.com/cms/dishes/1/category/3

##### Current implementation:
![edit-category.png](https://d31t95zge1f2me.cloudfront.net/redesign/edit-category.png)

![delete-category.png](https://d31t95zge1f2me.cloudfront.net/redesign/delete-category.png)

## Create dish page
On this page **admins** can fill in a **form** with dish data to create a new dish.

Form should contain inputs for **name**, **description** (should be multiline input), **measurement unit** (gr, ml, etc...), **measurement value**, **price**, **spicy level** (from 0 to 5), **ingredients** (should be multiline input), ingredients can also be entered as **set of emojis** (actual emojis + custom drawn emojis), **emoji picking component** should exist (does not exist in current implementation). Form should contain **labels input** where user can toggle on/off up to 8 labels (Meat, Pescetarian, Vegetarian, Vegan, Gluten, Lactose, Halal, Kosher), **'Chefs recommended' toggle** should exist (it is called 'featured') in current implementation. Custom color border input should exist: an **on/off toggle** and **color picker**. Multiple dish **images** can be uploaded into this form. Dish **3D model** can be uploaded. When it is uploaded, user can open model preview which will show the 3D model. Finally, form should have a submit **button**.**Errors** should appear if input has wrong input or form was rejected by server.

This page should also contain 2 images of the phone with **previews** of how dish will look like in app menu screen and app dish screen. this feature does not exist in current implementation.


##### Current URL:
http://test.menudget.com/cms/dishes/1/category/1/new-dish

##### Current implementation:
![create-dish.png](https://d31t95zge1f2me.cloudfront.net/redesign/create-dish.png)

## Edit dish page
On this page **admins** and **managers** can edit existing dish info. It contains the **same inputs** and **previews** as 'Create dish page'. Current implementation also has a **delete button** on this page. Pressing this button open a **confirmation modal**.

##### Current URL:
http://test.menudget.com/cms/dishes/1/1

##### Current implementation:
![edit-dish.png](https://d31t95zge1f2me.cloudfront.net/redesign/edit-dish.png)

![delete-dish.png](https://d31t95zge1f2me.cloudfront.net/redesign/delete-dish.png)

* * *

# 4. Orders page
Orders page is accessible by **all roles**. It should display all active orders of a restaurant grouped into 4 categories: **Pending**, **In progress**, **Complete** and **Delivered**. Orders can be **moved** from one group into the other. Also orders can be **deleted** which will remove them from this page.

Order should contain **creation date**, **table name**, **ordered dishes** with **count** and a **payed checkbox**. When setting order as payed it currently turns **green** to make it **stand out**, similar functionality should be implemented.

Admins can select **what restaurant** orders they see.

##### Current URL:
http://test.menudget.com/cms/orders/1

##### Current implementation:
![orders.png](https://d31t95zge1f2me.cloudfront.net/redesign/orders.png)

* * *

# 5. Tables pages
Tables pages allow **admins** and **managers** to **create/edit/delete** tables and **downloading** their QR codes.

## Tables page
Tables page is accessible for **admins** and **managers**. Tables page displays all tables of a restaurant. From this page user can select a table in order to **edit** it. User can also request to **create** a new table from this page. User can download table QR by clicking on **download button** on the table. Admins can select **what restaurant** tables they see.

##### Current URL:
http://test.menudget.com/cms/tables/1

##### Current implementation:
![tables.png](https://d31t95zge1f2me.cloudfront.net/redesign/tables.png)

## Create table page
On this page **admins** and **managers** can fill in a **form** with table **name** to create a new table. Form should have a submit **button**. **Errors** should appear if input has wrong input or form was rejected by server.

##### Current URL:
http://test.menudget.com/cms/tables/1/new

##### Current implementation:
![create-table.png](https://d31t95zge1f2me.cloudfront.net/redesign/create-table.png)

## Edit table page
On this page **admins** and **managers** can edit existing table name. Current implementation also has a **delete button** on this page. Pressing this button opens a **confirmation modal**.

##### Current URL:
http://test.menudget.com/cms/tables/1/1

##### Current implementation:
![edit-table.png](https://d31t95zge1f2me.cloudfront.net/redesign/edit-table.png)

![delete-table.png](https://d31t95zge1f2me.cloudfront.net/redesign/delete-table.png)

* * *

# 6. Waiters pages
Waiters pages allow **admins** and **managers** to **create/edit/delete** waiter accounts.

## Waiters page
Waiters page is accessible for **admins** and **managers**. Waiters page displays all waiters of a restaurant. From this page user can select a waiter in order to **edit** it. User can also request to **create** a new waiter from this page. Admins can select **what restaurant** waiters they see.

##### Current URL:
http://test.menudget.com/cms/waiters/1

##### Current implementation:
![waiters.png](https://d31t95zge1f2me.cloudfront.net/redesign/waiters.png)

## Create waiter page
On this page **admins** and **managers** can fill in a **form** with waiter **name** and **email** to create a new waiter. Form should have a submit **button**. **Errors** should appear if input has wrong input or form was rejected by server.

##### Current URL:
http://test.menudget.com/cms/waiters/1/new

##### Current implementation:
![create-waiter.png](https://d31t95zge1f2me.cloudfront.net/redesign/create-waiter.png)

## Edit waiter page
On this page **admins** and **managers** can edit existing waiter **name** and **email**. Current implementation also has a **delete button** on this page. Pressing this button opens a **confirmation modal**.

##### Current URL:
http://test.menudget.com/cms/waiters/1/6

##### Current implementation:
![create-waiter.png](https://d31t95zge1f2me.cloudfront.net/redesign/edit-waiter.png)

![delete-waiter.png](https://d31t95zge1f2me.cloudfront.net/redesign/delete-waiter.png)

* * *

# 7. Navigation

To navigate between pages current implementation has a **nav bar** which contains links to **restaurants** page, **dishes** page, **orders** page, **waiters** page and a **logout button**. Certain links are **hidden** based on **user role**.

##### Current implementation:

###### Admin nav bar
![admin-nav-bar.png](https://d31t95zge1f2me.cloudfront.net/redesign/admin-nav-bar.png)

###### Manager nav bar
![manager-nav-bar.png](https://d31t95zge1f2me.cloudfront.net/redesign/manager-nav-bar.png)

###### Waiter nav bar
![waiter-nav-bar.png](https://d31t95zge1f2me.cloudfront.net/redesign/waiter-nav-bar.png)


# 8. Localization

CMS should contain functionality of changing interface language (English, Dutch, Ukranian...)

# 9. Error pages.

We need 2 error page designs, for 404 and 403.
404 - not found
403 - no allowed

##### Current implementation:
![not-found.png](https://d31t95zge1f2me.cloudfront.net/redesign/not-found.png)
![not-allowed.png](https://d31t95zge1f2me.cloudfront.net/redesign/not-allowed.png)
