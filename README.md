## E-store built with Next.JS 13
---
### About
I built this for fun, in order to practice my Next.JS - React.JS. I might use this project as template for future projects - or if I turn into a freelancer heheh. 

**Project so far**

 + Explore & Categories pages with available Store Items
 + Add Items to Cart and Cart Page
 + User Logins and User Page with Orders and Favorite Items
 + Admin Panel ( CRUD for Items & Categories and View Orders ) with a guest mode
 + Order Confirmation emails ( via SendGrid )
 ---
 + Item Pages with Recommendations
 + Dark mode <3
 + Responsive design
 + Sort products by price and by date added 
 + Price range ( Double slider )
 + Page loading animations
 + Custom checkout page ( we use the Commerce.js API )
 + Handling unauthorized admin requests
 + Contact Developer Form ( works with SendGrid )
 + Search Bar that updates automatically when query changes
 + Has an automatic order making script with Cypress.
 ---

**To do list**

- [x] Project state is marked as complete as I don't want this to be anything bigger than it currently is.

### Technologies used
+ Next.JS 13 - App Router
+ Deployed with Vercel (check the link to webpage on GitHub)
+ TailwindCSS
+ Commerce.js
+ Auth.js ( 0Auth user login )
+ SendGrid ( order confirmation mails )
+ Mongodb ( for favorite items ) and Mongodb Atlas ( cloud database provider )

    I was looking for something free. That one had 2% commission on orders. I didn't plan to actually sell things, so we are good. I didn't use the driver. I did it using their API with Next.JS 13 fetch().
	
	---
	Alternatives I could use  
	
	+ Saleor (Though there was a bit of set up needed, if I wanted to use it in the future without paying a fee. I've noticed some high latency with Commerce.js, maybe it would be better with Saleor Cloud during development..)  
	+ Some cloud database and design the schemas myself - handle auth etc... (Some options: Supabase (non commercial use), MongoDB, Firebase..)
	
	

### Vent
Ahh, that was perhaps the last project I will ever start with React. I am planning to start using Svelte. I also feel like Flutter > ReactNative, so React will kinda feel like nostalgy. I am planning on finishing all of the other unfinished projects by Summer's 2023 end. 

## How does it work? 

---

# API
We are using the Commerce.JS API for the commerce part ( item database and schema, categories, checkout and other functions).
We make API calls using Next.JS server side code. 

Here is an example of what one of those functions might look like:

    export const captureOrder = async(checkoutData:checkoutData) =>{ 
    //checkoutData is a custom type
    
	    const url = new URL(
	        `https://api.chec.io/v1/checkouts/${checkoutData.checkout_token_id}`
	    );
	    const headers = {
	        "X-Authorization": `${process.env.NEXT_PUBLIC_CHEC_PUBLIC_API_KEY}`, //Our API key
	        "Content-Type": "application/json",
	        "Accept": "application/json",
	        "Access-Control-Allow-Origin": "*" 
	    };
	    
	    const res= await fetch(url, {
	        method: "POST",
	        headers: headers,
	        body: JSON.stringify(checkoutData.body)
	    });
	
	    return res.json();
	    
	    //This particular result is handled by the handleSubmit() of its corresponding form.
    }

Such calls are either placed inside **Server Components** (e.g. for the initial rendering of the store's items) or inside **Server Actions** (e.g. form submits). 

---

#### The project is divided in 2 parts. The \`Admin Panel\` and the \`Store Page\`. We use different layouts for each on of those so the folder structure is like:
app  
&ensp;|\__(Admin)  
&ensp;&ensp;|__  layout.tsx  
&ensp;&ensp;|__  admin  
&ensp;&ensp;&ensp;|__  page.tsx = /admin  
&ensp;|\__(Store)  
&ensp;&ensp;|__  layout.tsx  
&ensp;&ensp;|__  page.tsx   = root directory page

Each with a different root layout.

---


## <u>Store Page</u>

#### 1. Listing items
Currently the '/' page lists the items. It is using the API mentioned above and we use a query in our request, "limit", that limits the items returned. However there is the '/explore' page which has also uses a pagination query. When the homepage is ready there might be an 'explore more items' button that takes the user there.

#### 2. Cart
The cart was kind of tricky as it was my first time working with cookies.   
  
  We basically create a cookie using client side React, as setting cookies is only doable via server actions (e.g. forms) in Server Components. We have a useEffect() that checks if there is one cart already stored in a cookie, else we create a new one.
  
The new cart is generated via the Commerce.js API, we basically get our cart_id, which can later be used to see what items our cart includes. 
#### 3. Caching

Everything is cached inside User.   
This drops the need to make a new fetch request to the Commerce.JS API every time we move to another page or refresh. Initially I only cached the listings due to some additional complexity the cart needed.   
  
  Then I realized that all of this time waiting to fetch our cart every time the page refreshes is kind of a lot. Especially during development...  
    
When we fetch the items and cart, we have added a tag to each one of them. When our cart changes (we add a new item or change the quantity of an existing one), if the fetch was successful, we revalidate the cart tag. When we complete an order we revalidate the items tag.

#### 4. Checkout

I started working on the checkout after having finished the basic implmentation of the Admin Panel. I was experimenting with Server Only Components for all parts of the website and learned some new ways to do things. 

I kind of struggled to make checkout work initially.
Why?

Basically the way the Admin Panel pages work is by submitting forms, then being redirected to a loading page, until the backend finishes its tasks. 

The way this worked was that on submit (or better said "on action"), the website redirects to the other page, passing the FormData into the <u>Search Parameters</u>. 

Of course you don't want to make your credit card details visible on your browsers history.. Or do you?

After consulting my good friend (Chat-GPT), I came into conclusion that I have to ?encrypt? the data, basically use the POST form method.   
Of course this way I couldn't do it my way (redirecting to a loading screen page), so I ended up using a client component (just the submit button haha). 
  
Also while figuring out solutions I was reminiscing some other stages of the project and I realized I never ended up using a form with a Next.JS route.   
  
  For that and for also keeping an archive of how to use FormData with Next.JS routes, instead of doing the body construction inside our server component, I ended up doing it inside a route 	

>const url = `${process.env.SERVER_URL}/checkout/handle`;

POST method works with routes.
  
Finally if the order is successful, you get redirected to a '/success' page, which removes your old cart_id cookie.  

#### 5. Dark Mode

Dark mode was especially easy to implement thanks to TailWindCSS. 
The hard part was making a switch for it. I was skeptical weather I should have used a cookie or something else.   
  
  I ended up using LocalStorage (small storage where websites can store data on your browser).   
  
  The reason for not using a cookie is that if you switched on/off the button too many times, it would trigger a page reload. While working on Dark Mode, I wasn't caching the cart yet, so this would result in the button getting stuck for several seconds.
  
  Also despite the development environment's warnings/errors, I put LocalStorage inside useState.   
  During development that gives not defined errors, however it doesn't seem to break anything and it is the only way I managed to prevent FOUC.

#### 6. Search Bar

  The Search bar is a “use client” component imported in the header server (default)  component. We use React Hooks to listen for changes on input. We do wait for some delay before making a fetch request — just to make sure the user isn’t still typing.

After that delay we make a fetch request and get back our results. The API has a query option, that will match all of the items related to our query — making it quite simple for us that don’t want to spend time optimizing that item search.

All of these happen inside a useEffect() hook.

While typing and until we get some results there is a loading animation.

To make the result field (which also includes the animation) visible, I use a ‘peer-focus-within:inline’ class by Tailwind. However! this isn’t enough to let us click on our results. The result field becomes ‘hidden’ again before our click triggers. To solve this, we can also add a ‘hover:inline’ class to our field.

#### 7. Adding Favorites

  Adding items as favorites uses the MongoDB Node.js driver. We have our backend logic in "Server files" ( ending in .ts ) and we communicate our requests using the route API provided by Next.js. 

  The 'add to favorites' component is a Client Component and it sends a fetch PUT request to our Next.js API route. The request includes the email address and the product id. 
  
  Our MongoDB database has a unique index the 'email' field. We use an array for the favorite items for each email address. We add items to the array using the '$addToSet' operator, to make sure we don't have duplicate entries. We remove entries using the '$pull' operator. 

  The database is hosted on the cloud, the service used is MongoDB Atlas.


---

### <u>Admin Panel</u>

Everything inside Admin Panel is currently a Server Component!   
That's right, no Client Components.

The way it's working is simple.   
  
  We have a form, when the form gets submitted via a Server Action we get redirected to another page, passing the FormData in the Search Params.   
   
The page we are being redirected to, has a loading animation. Then depending on the fetch() result, we are either sent to a custom page, or the same with the previous one. Whichever one, this time we carry a message: if our fetch was successful or not and the additional info if there was any provided.

This approach uses again SearchParams (and/or just params) as a data channel and the UI is changed according to that (Error or Success Components).    

The only possibly issue with that is that if you refresh the page, you get the same message again. This could be considered a feature as our 'messages' have a duration of like 3 seconds. 
If the user refreshes they can be reminded of their last action.   
-- However say you press a link in your browser's history and you end up in one of those pages. One could uneedingly stress, thinking they made a change to the store. Basically the 'messages' are logs, not actual realtime server responses.

#### 1. Signing In

Signing in/up is done easily with OAuth. We use Auth.JS (its older version actually called 'NextAuth.js' as the newer one is still under development as of writing). 
  
  The set up is easy if you know what you are doing. I struggled a bit due to bad documentation, but I managed to configure it. 
  Signing in is only allowed for my personal email address -- This is configurable with Auth.JS. Trying to Sign In with another email redirects to an error page saying you are Unauthorized.
#### 2. Guest Mode

Guest Mode is enabled or disabled by the use of a cookie.   

It enables viewing what an actual admin can view, but disables the form submit functions.


  Currently it's just a ternary operator. e.g.
>action={session?'/admin/.../loading':'/admin/unauthorized'}

  
  I feel like this ternary operator is kind of dangerous and that the action could be more secure. Mistakes can happen.. 
  
  
  #### 3. Image Upload  
  
  Uploading images with forms was a bit more complicated than I initially anticipated. There was no place in the internet demonstrating a straightforward approach and they were mostly using some external libraries (e.g. Axios, formidable etc.).  
    
   My approach is kind of simple.
   
   1. We create a new FileReader and we convert the file to a base64 encoded string. 
  
    const reader = new FileReader();
    reader.readAsDataURL(file);
   2. Uploading the file directly didn't work for me (I don't know why), so I created a route as a middleman. We pass the data with the fetch API and 'Post' as the method.
   
    await fetch("/admin/items/upload",{
		method: "POST",
		body:JSON.stringify({binaryData:encodedFile,fileName:fileName})
	})
  3. From the route we can upload the asset using the commerce API.
  4. We get the response from the API. We specifically use the assetID returned and use that as a hidden field in our form. 
  
  What basically happens is:
  1. We upload the image (asset)
  2. We get the asset id
  3. We submit our new item (we get our product id back)
  4. If (3) is successful we pass our asset id to the new item.
  
  ---
  Overally I believe that this is the best of all my Web Development Projects (or atleast the most complete and of bigger scale -- considering what you can do).   
  
  If you consider that it is mostly fetching data it isn't that big of a deal. Continuing making this I feel like in the end the most time consuming thing is configuring the new pages (e.g. now I am building the Orders - Admin page).
  
  Of course I believe that I could organize CSS and components better as I have a lot of repeating code. I may not update it as it works just as it is, but I will surely note it and think about it beforehands for future projects.   

Specifically what I'd like to have made from the beginning:

 + Better function naming
 + CSS color choosing and configuring TailWindCSS, e.g. instead of randomly guessing the exact bg-color that my other components have, I could create a custom class: bg-dark-[A,B,C], bg-[A,B,C]
 + More reusable components. I was creating \<main> elements for each page and a couple of divs, with the exact same stylings. I could have just made components for those. This would make it more efficient restyling the whole WEBSITE. This is something one should note if they use this project as a basis for theirs.   Generally I feel like I was avoiding creating custom components for this project
 + More consistent folder structure. Currently I realize it's more efficient having an api folder for each subdirectory, instead of having a central api folder. Especially for page-specific APIs.

 ## Known Errors

1. Cart doesn't work properly on weak connections.

      Specifically: After you add an item to cart, the Cart Page doesn't update its values. It feels like 'getCartItems()' doesn't revalidate/refetch. 
  
      This specific problem is hard to debug, due to it being hard to reproduce.. I have only noticed it happening on my mobile phone browsers and I am not entirely sure if it is a connectivity error or a Next.JS error.

      Basically after adding an item in cart, our 'getCartItems' function should revalidate (we use RevalidateTag). 
      
      At first I was thinking that the function might not be properly called, but some console.log() showed me that this is not the issue. 
      
      I was then trying to see if the issue was with RevalidateTag or caching in general. Of course I wouldn't completely disable caching as this would make every page load way slower. 

      I have thought of some workarounds ( and tried different things on the client side ). One workaround that must work but I haven't tried is to use Redux for the cart, so that we have a global cart object. That cart object could be updated based on the response of each 'updateCart()' call as it also includes the cart state.

      ( updateCart() updates the items in our current cart in the Commerce.js database )

      I tried logging the results of the updateCart() on the devices that showed the problem to a MongoDB database, and noticed that we get our actual new cart state after using the said function -- So I am sure that the above workaround should work. However I will leave the project at its current state.


2. After some commit we have started getting a random server side error, about some State. 

    I am not sure what causes this. At the beginning I thought that it might be some useEffect(), but that could not be it, as it was logged on the server console. Then I tried removing the cypress package and it looked like the error wasn't being logged anymore? But this was temporary. This also started appearing when I was trying things for the problem #1 above, so I also thought that it might be something related to cache. Nevertheless, we can deploy normally and have the website working with no visible errors..

3. Price Range Slider ( Double Slider ) doesn't work as I intended it to work.

    Commerce.js docs say we can use the parameters 
    + price.above	
    + price.below

      ---

    However I wasn't getting results based on them, so I thought that they either need some special implementation not mentioned in the docs, or were just simply not a functional thing when I tried to use them.

    This means I can't use pagination properly with my double slider. I filter my results after getting the paginated version of them. That can make each page to have a different amount of displayed items. This can also hide a, say page 3, if there is a page 2 with 0 items withing the price range.

    The slider is there. In case someone finds the above parameters working, then they can use it.



4. Commerce.js Servers might experience downtime and the store might unexpectedly stop working.

5. Everyone COULD update the store.

    This was happening as I was updating the store using SEARCH PARAMS and requiring authorization only TO REDIRECT to the needed page with the query on SEARCH PARAMS. 

    Problems with this:
      + Anyone knowing about this could edit the store, even if they were not authorized.
      + Clicking on a link in your history where you had edited say an item, would edit this item again. 
      ( Let's say you click on a link that was editing an item during a promotion event, you had updated the item after the promotion event, but after accidentally clicking on the history link, you change the item back to that promotional state. )  

    The first problem is solved by using Auth.js getSession() and checking if the email of the logged in user is an admin before making a change. However the history thing is still an issue and should be updated. What I've learnt is that form method:'get' should only be used for getting results haha - not update queries..