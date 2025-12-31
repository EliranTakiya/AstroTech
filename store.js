// fetch("products.json")
// .then((response)=>response.json())
// .then((data)=>console.log(data));

// const data=require("./store.json")
// console.log(JSON.stringify(data))


fetch("store.json")
    .then((response) => response.json())
    .then((data) => {
        // פנייה לדיב
        const productsDiv = document.getElementById("products");
        const cartDiv = document.getElementById("cart");
        const cartTotalItems = document.getElementById("cartTotalItems");
        const cartTotalItems2 = document.getElementById("cartTotalItems2");
        const cartTotalDropDown = document.getElementsByClassName("text-info");
        // משתנה שיסכום את המחירים של העגלה
        let cartTotal = 0;
        let totalItems = 0

        var productsList = [];

        // לולאה על הדאטא
        data.products.forEach((product) => {
            //  יצירה של דיב כולל
            const productDiv = document.createElement("div");
            productDiv.className = "productDiv";
            // יצירה של אלמנטים שיציגו את המידע בתוך הדיב הכולל
            productDiv.innerHTML = `
         
        <h3>${product.name}</h3>
       
        `
            //   <img src="${product.image}"/>
            let image = document.createElement('img');
            image.src = product.image;
            productDiv.appendChild(image);
            image.className = "imgDivs";
            // image.style.cursor = "pointer";
            image.id = "imgDivsId";


            let innerImgText = document.createElement("p");
            innerImgText.innerText = "read more";
            innerImgText.className = "centered";
            productDiv.appendChild(innerImgText);


            let infoDiv = document.createElement('p');
            infoDiv.innerHTML = product.info;
            infoDiv.className = "infoDiv5";
            infoDiv.style.display = "none";
            productDiv.appendChild(infoDiv);

            let paragraph = document.createElement('p');
            paragraph.innerHTML = `$${product.price}`;
            paragraph.className = "priceClass";
            productDiv.appendChild(paragraph);

            const addToCart = document.createElement('button');
            addToCart.id = "addToCartButton";
            addToCart.textContent = "Add to cart";
            const rmv_btn = document.createElement('button');
            rmv_btn.id = "rmv_btn";
            rmv_btn.textContent = "remove item";
            productDiv.appendChild(addToCart)
            productDiv.appendChild(rmv_btn);

            // console.log(productDiv)

            //imageClick
            // image.addEventListener("click", () => {
            //     let itemIndex = document.getElementById('products');
            //     let itemIndex2 = document.getElementsByClassName('productDiv');
            //     let itemIndex3 = document.getElementsByTagName('h3');
            //     let itemIndex4 = document.getElementsByClassName('infoDiv5');

            //     for (let i = 0; i < itemIndex3.length; i++) {

            //         if (itemIndex3[i].innerText == product.name) {
            //             // console.log(true)
            //             // console.log(product.name)
            //             // console.log(itemIndex4[i])
            //             if (itemIndex4[i].style.display == "none") {
            //                 handleShow(itemIndex4[i])
            //             }
            //             else {
            //                 handleHide(itemIndex4[i]);
            //             }
            //         }
            //         else if (itemIndex4[i].style.display !== 'none') {
            //             handleHide(itemIndex4[i]);
            //         }
            //     }
            // }
            // )


            //try read more


            innerImgText.addEventListener("click", () => {
                let itemIndex = document.getElementById('products');
                let itemIndex2 = document.getElementsByClassName('productDiv');
                let itemIndex3 = document.getElementsByTagName('h3');
                let itemIndex4 = document.getElementsByClassName('infoDiv5');

                for (let i = 0; i < itemIndex3.length; i++) {

                    if (itemIndex3[i].innerText == product.name) {
                        // console.log(true)
                        // console.log(product.name)
                        // console.log(itemIndex4[i])
                        if (itemIndex4[i].style.display == "none") {
                            handleShow(itemIndex4[i])
                            innerImgText.innerText = "x";
                        }
                        else {
                            handleHide(itemIndex4[i]);
                            // innerImgText.innerText="read more";
                            innerImgText.innerText = "read more";
                        }
                    }
                    else if (itemIndex4[i].style.display !== 'none') {
                        handleHide(itemIndex4[i]);
                        // innerImgText.innerText="???";

                    }

                }
            }
            )

            innerImgText.addEventListener("click", () => {
                let itemIndex = document.getElementById('products');
                let itemIndex2 = document.getElementsByClassName('productDiv');
                let itemIndex3 = document.getElementsByTagName('h3');
                let itemIndex4 = document.getElementsByClassName('infoDiv5');
                let inner = document.getElementsByClassName('centered');
                for (let i = 0; i < itemIndex3.length; i++) {
                    if (itemIndex3[i].innerText !== product.name) {
                        inner[i].innerText = "read more";
                    }

                }
            }
            )

            //till here
            function handleShow(itemIndex) {
                itemIndex.style.display = "block";
            }
            function handleHide(itemIndex) {
                itemIndex.style.display = 'none';
            }





            // פנייה לכפתור על ידי משתנה 
            const addButton = productDiv.querySelector("#addToCartButton");
            // יצירת איוונט ליסטנר לכפתור
            addButton.addEventListener("click", () => {
                let itemNames = [];
                for (let i = 0; i < productsList.length; i++) {
                    let itemName = productsList[i].name;
                    // console.log(itemName);
                    itemNames.push(itemName);


                } console.log(itemNames);


                function removeDuplicates(arr) {
                    return [...new Set(arr)]
                }



                // חיבור המחיר למחיר הקודם
                cartTotal += product.price;
                totalItems += 1;
                productsList.push(product);
                // totalItems = productsList.length;

                localStorage.setItem("products", JSON.stringify(productsList));
                console.log(productsList);
                let counter = 0;
                for (let i = 0; i < productsList.length; i++) {
                    if (productsList[i].id == product.id) {
                        counter += 1;
                    }

                }
                console.log(`${product.name} ${counter}`);

                const counts = [];
                productsList.forEach((item) => {
                    if (item.id == product.id) {
                        counts.push(item);
                    }
                })

                // console.log(counts);

                // localStorage.setItem('products',JSON.stringify(productsList));

                cartTotalItems.textContent = `${totalItems}`;
                cartTotalItems2.textContent = `${totalItems}`;
                cartTotalDropDown[0].textContent = `$${cartTotal.toFixed(2)}`;

                // פנייה לדיב של העגלה והוספת מלל והמחיר הכולל
                cartDiv.textContent = ` total:$${cartTotal.toFixed(2)} `;
                // יצירת דיב להודעה items:${totalItems}
                const msgDiv = document.createElement("div");
                // ההודעה שתופיע לכל מוצר
                msgDiv.textContent = `${product.name} added to cart`;
                // השלכת ההודעה לתוך העמוד
                alert(msgDiv.textContent);
                const f = document.querySelector('#msg');
                const c = document.getElementById('cap');
                c.style.display = "block";
                document.body.appendChild(msgDiv);
                f.appendChild(msgDiv);
                // קביעת טיים אאוט להודעה שתיעלם לאחר 2 שניות
                setTimeout(() => {
                    f.removeChild(msgDiv);
                }, 2000);



                let itemNames1 = [];
                for (let i = 0; i < productsList.length; i++) {
                    let itemName = productsList[i].name;
                    // console.log(itemName);
                    itemNames1.push(itemName);
                }
                console.log(removeDuplicates(itemNames1));
                if (itemNames.includes(product.name)) {
                    let countered = 0;
                    for (let i = 0; i < itemNames.length; i++) {
                        if (itemNames[i].name === product.name) {
                            countered += 1;
                        }
                    }
                    let itemCartIndex = (removeDuplicates(itemNames)).indexOf(product.name);
                    console.log(itemCartIndex);
                    // let itemQuantityElement = productsList[itemCartIndex];
                    // let itemQuantity = parseInt(itemQuantityElement.innerText);
                    let itemQuantity = counter;
                    // itemQuantityElement.innerText = countero;
                    const cou = document.getElementsByClassName('count');
                    cou[itemCartIndex].innerHTML = "Quantity: " + itemQuantity;
                    const pri = document.getElementsByClassName('price text-info');
                    pri[itemCartIndex].innerHTML = "price: " + `$${(product.price * itemQuantity).toFixed(2)}`;
                    // updateCartTotal();
                }
                else {


                    let itemCartIndex = (removeDuplicates(itemNames1)).indexOf(product.name);
                    console.log(itemCartIndex);
                    //  let itemQuantityElement=productsList[itemCartIndex];
                    //  let itemQuantity=parseInt(itemQuantityElement.innerText);
                    //  itemQuantity=itemQuantity+1;
                    //  itemQuantityElement.innerText=itemQuantity;
                    let itemQuantity = 1;


                    var img = document.createElement('img');
                    img.src = product.image;
                    var foo = document.getElementsByClassName('cart-detail-img');


                    foo[itemCartIndex].appendChild(img);
                    var p = document.createElement('p');
                    p.innerText = product.name;
                    var foo2 = document.getElementsByClassName('cart-detail-product');

                    foo2[itemCartIndex].appendChild(p);
                    var span = document.createElement('span');
                    span.innerText = "price: " + `$${product.price * itemQuantity}`;
                    var foo3 = document.getElementsByClassName('price text-info');

                    foo3[itemCartIndex].appendChild(span);
                    var span2 = document.createElement('span');
                    span2.innerText = `${'Quantity: '}${itemQuantity}`;
                    var foo4 = document.getElementsByClassName('count');

                    foo4[itemCartIndex].appendChild(span2);

                    var buttonRem = document.createElement('button');
                    buttonRem.className = 'buttonRemove';
                    buttonRem.innerText = "remove 1";

                    buttonRem.addEventListener('click', () => {
                        let found = false;
                        if (cartTotal >= 1 && totalItems >= 1 && productsList.includes(product)) {


                            let itemNames = [];
                            for (let i = 0; i < productsList.length; i++) {
                                let itemName = productsList[i].name;
                                // console.log(itemName);
                                itemNames.push(itemName);


                            } console.log(itemNames);

                            function removeDuplicates(arr) {
                                return [...new Set(arr)]
                            }
                            let counter = 0;
                            for (let i = 0; i < productsList.length; i++) {
                                if (productsList[i].id == product.id) {
                                    counter += 1;
                                }

                            }

                            itemCartIndex = (removeDuplicates(itemNames)).indexOf(product.name);

                            let itemQuantity = counter;

                            // itemQuantityElement.innerText = countero;
                            const cou = document.getElementsByClassName('count');
                            cou[itemCartIndex].innerHTML = "Quantity: " + (itemQuantity - 1);
                            const pri = document.getElementsByClassName('price text-info');
                            pri[itemCartIndex].innerHTML = "price: " + `$${(product.price * itemQuantity - product.price).toFixed(2)}`;
                            // updateCartTotal();
                            if (counter == 1) {
                                const deleteProduct = document.getElementsByClassName('cart-detail');

                                deleteProduct[itemCartIndex].remove(deleteProduct[itemCartIndex]);

                            }


                            cartTotal -= product.price;
                            totalItems--;


                            for (let i = 0; i < productsList.length; i++) {
                                if (productsList[i].name == product.name) {
                                    productsList.splice(i, 1);
                                    break;
                                }
                            }

                            // productsList=productsList.filter(product=> !productsList.includes(product.name));
                            // productsList.pop(product);
                            found = true;
                            localStorage.setItem("products", JSON.stringify(productsList));

                            console.log(productsList)


                        }


                        // localStorage.removeItem('products',product)

                        // let count=[];
                        // for(let i = 0; i < productsList.length; i++) {
                        //     if(productsList[i].id==product.id){
                        //         count.push(product);
                        //     }}
                        //     console.log(count);
                        //     console.log(`${product.name} ${count.length}`);


                        cartTotalItems.textContent = `${totalItems}`;
                        cartTotalItems2.textContent = `${totalItems}`;
                        cartTotalDropDown[0].textContent = `$${cartTotal.toFixed(2)}`;

                        // פנייה לדיב של העגלה והוספת מלל והמחיר הכולל
                        cartDiv.textContent = `total:$${cartTotal.toFixed(2)}`;
                        // יצירת דיב להודעה total items:${totalItems}
                        const msgDiv = document.createElement("div");
                        // ההודעה שתופיע לכל מוצר
                        msgDiv.textContent = `${product.name} removed from cart`;
                        // השלכת ההודעה לתוך העמוד

                        if (found) {
                            document.body.appendChild(msgDiv);
                            alert(msgDiv.textContent);
                            const g = document.querySelector('#msg');

                            g.appendChild(msgDiv);
                            // קביעת טיים אאוט להודעה שתיעלם לאחר 2 שניות
                            setTimeout(() => {
                                g.removeChild(msgDiv);
                            }, 2000);

                        }

                    })
                    var foo5 = document.getElementsByClassName('rem');
                    foo5[itemCartIndex].appendChild(buttonRem);



                }


            })





            // remove section


            const removeButton = productDiv.querySelector('#rmv_btn');
            removeButton.addEventListener('click', () => {
                let found = false;
                if (cartTotal >= 1 && totalItems >= 1 && productsList.includes(product)) {


                    let itemNames = [];
                    for (let i = 0; i < productsList.length; i++) {
                        let itemName = productsList[i].name;
                        // console.log(itemName);
                        itemNames.push(itemName);


                    } console.log(itemNames);

                    function removeDuplicates(arr) {
                        return [...new Set(arr)]
                    }
                    let counter = 0;
                    for (let i = 0; i < productsList.length; i++) {
                        if (productsList[i].id == product.id) {
                            counter += 1;
                        }

                    }

                    itemCartIndex = (removeDuplicates(itemNames)).indexOf(product.name);

                    let itemQuantity = counter;

                    // itemQuantityElement.innerText = countero;
                    const cou = document.getElementsByClassName('count');
                    cou[itemCartIndex].innerHTML = "Quantity: " + (itemQuantity - 1);
                    const pri = document.getElementsByClassName('price text-info');
                    pri[itemCartIndex].innerHTML = "price: " + `$${(product.price * itemQuantity - product.price).toFixed(2)}`;
                    // updateCartTotal();
                    if (counter == 1) {
                        const deleteProduct = document.getElementsByClassName('cart-detail');

                        deleteProduct[itemCartIndex].remove(deleteProduct[itemCartIndex]);
                    }


                    cartTotal = cartTotal - product.price;
                    totalItems--;


                    for (let i = 0; i < productsList.length; i++) {
                        if (productsList[i].name == product.name) {
                            productsList.splice(i, 1);
                            break;
                        }
                    }

                    // productsList=productsList.filter(product=> !productsList.includes(product.name));
                    // productsList.pop(product);
                    found = true;
                    localStorage.setItem("products", JSON.stringify(productsList));

                    console.log(productsList)

                }



                cartTotalItems.textContent = `${totalItems}`;
                cartTotalItems2.textContent = `${totalItems}`;
                cartTotalDropDown[0].textContent = `$${cartTotal.toFixed(2)}`;

                // פנייה לדיב של העגלה והוספת מלל והמחיר הכולל
                cartDiv.textContent = `total:$${cartTotal.toFixed(2)} `;
                // יצירת דיב להודעהtotal items:${totalItems}
                const msgDiv = document.createElement("div");
                // ההודעה שתופיע לכל מוצר
                msgDiv.textContent = `${product.name} removed from cart`;
                // השלכת ההודעה לתוך העמוד

                if (found) {
                    document.body.appendChild(msgDiv);
                    alert(msgDiv.textContent);
                    const g = document.querySelector('#msg');

                    g.appendChild(msgDiv);
                    // קביעת טיים אאוט להודעה שתיעלם לאחר 2 שניות
                    setTimeout(() => {
                        g.removeChild(msgDiv);
                    }, 2000);

                }
                else {
                    alert('item not found in your cart');
                }
            });

            productsDiv.appendChild(productDiv);
        })
    });



function myFunction() {
    var input = document.getElementById('search');
    var filter = input.value.toLowerCase();

    var products = document.getElementsByClassName('productDiv');
    for (let i = 0; i < products.length; i++) {
        if (products[i].innerText.toLowerCase().includes(filter)) {
            products[i].style.display = "";
        } else {
            products[i].style.display = 'none';
        }

    }

}



function priceSearch() {
    var input = document.getElementById('priceSearch');
    var filter = input.value;

    var products = document.getElementsByClassName('priceClass');
    var allProducts = document.getElementsByClassName('productDiv');
    var priceDiv = document.getElementsByClassName('priceClass');
    var p = document.getElementsByTagName('p');
    for (let i = 0; i < products.length; i++) {
        const str = products[i].innerText;
        const res = str.replace(/\D/g, ' ');
        if (Number(res) <= filter) {
            //  console.log(filter)
            // console.log(products[i].innerText);

            allProducts[i].style.display = "";
        } else {
            allProducts[i].style.display = 'none';
        }
    }

}














