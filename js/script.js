const event = (()=>{
    const navBar = document.getElementById('navBar')
    window.addEventListener('scroll', ()=>{
        const height = document.documentElement.scrollTop || pageYOffset;
        (height > 76)? navBar.classList.add('navbar-change') : navBar.classList.remove('navbar-change')
    })

    window.addEventListener('load', ()=>{
        document.querySelector('.preloader').classList.add('hidePreloader');
    })
})();

const createCars = (()=>{
    const cars = []

    class Car{
        constructor(name, country, img, price, special, model, trans, gas, type){
            this.name = name;
            this.country = country;
            this.img = img;
            this.price = price;
            this.special = special;
            this.model = model;
            this.trans = trans;
            this.gas = gas;            
            this.type = type;
        }
    }

    function makeCars(name, country, img='car-german-1.jpeg', price="10000", special = true, model="NEW MODEL", trans = "automatic", gas = "50", type="Sedan" ){
        let car = new Car(name, country, img, price, special, model, trans, gas, type);
        cars.push(car);
    }

    function productCard(){
        makeCars("Chevy", "american");
        makeCars("BMW", "german", "car-german-2.jpeg", "25000", true, 'OLD MODEL');
        makeCars("BMW", "german", "car-german-4.jpeg", "25000", false);
        makeCars("Chevy", "american", "car-german-2.jpeg", "25000", true, 'OLD MODEL');
        makeCars("BMW", "american", "car-german-3.jpeg", "25000", false);
        makeCars("BMW", "german", "car-german-2.jpeg", "25000", false);
        makeCars("Chevy", "american", "car-german-3.jpeg", "25000", true);
        makeCars("BMW", "german", "car-german-2.jpeg", "25000", true);
    }

    productCard();

    const specialCars = cars.filter(car => car.special === true)

    return{
        cars, specialCars
    }
})();

const featuredCars = ((createCars) =>{
    let specialCars = createCars.specialCars;
    let featuredInfo = document.querySelector('.featured-info');
    
    
    document.addEventListener('DOMContentLoaded', ()=>{
        featuredInfo.innerHTML = "";
        let data = ''
        specialCars.forEach((item)=>{
            data += `
            <!-- single item -->
            <div class="featured-item my-3 d-flex p-2 text-capitalize align-items-baseline flex-wrap">
              <span data-img="img/${item.img}" class="featured-icon mr-2">
                <i class="fas fa-car"></i>
              </span>
              <h5 class="font-weight-bold mx-1">${item.name}</h5>
              <h5 class="mx-1">${item.model}</h5>
            </div>
            <!-- end of single item -->
            `;            
        })
        featuredInfo.innerHTML = data;
    })

    featuredInfo.addEventListener('click', (event) =>{
        if(event.target.parentElement.classList.contains('featured-item')){
            let dataImg = event.target.parentElement.children[0].dataset.img;
            document.querySelector('.featured-photo').src = dataImg
        }
    })
})(createCars)


const ourInventory = ((createCars) =>{
    let inventoryContainer = document.querySelector('.inventory-container');
    let cars = createCars.cars;

    document.addEventListener('DOMContentLoaded', ()=>{
        inventoryContainer.innerHTML = ''
        let data = "";

        cars.forEach((item)=>{
            data += `
            <!-- single car -->
            <div class="col-10 mx-auto my-3 col-md-6 col-lg-4 single-car ${item.country}">
                <div class="card car-card">
                    <img src="img/${item.img}" class="card-img-top car-img" alt="">
                    <!-- card body -->
                    <div class="card-body">
                        <div class="car-info d-flex justify-content-between">
                            <!-- first flex child -->
                            <div class="car-text text-uppercase">
                                <h6 class="font-weight-bold">${item.name}</h6>
                                <h6>model</h6>
                            </div>
                            <!-- second flex child -->
                            <h5 class="car-value align-self-center py-2 px-3">$
                                <span class="car-price">${item.price}</span>
                            </h5>
                        </div>
                    </div>
                    <!-- end of card -->
                    <div class="card-footer text-capitalize d-flex justify-content-between">
                        <p><span><i class="fas fa-car"></i></span>${item.type}</p>
                        <p><span><i class="fas fa-cogs"></i></span>${item.trans}</p>
                        <p><span><i class="fas fa-gas-pump"></i></span>${item.gas}</p>
                    </div>
                </div>
            </div>
            <!--end of single car -->
            `;
            inventoryContainer.innerHTML = data
        })
    })
})(createCars)

const filterCar = (()=>{
    let filterBtn = document.querySelectorAll('.filter-btn');
    filterBtn.forEach((btn) =>{
        btn.addEventListener('click', ()=>{
            let dataFilter = btn.dataset.filter;
            let singleCar = document.querySelectorAll('.single-car');

            singleCar.forEach((car)=>{
                 if(dataFilter === "all"){
                     car.style.display = 'block'
                 }else{
                     (car.classList.contains(dataFilter))?car.style.display='block':car.style.display='none';
                 }
            })
        })
    })
})()

const showGallery = (()=>{
    const galleryItem = document.querySelectorAll('.gallery-item');
    const showcase = document.querySelector('.showcase');
    galleryItem.forEach((gallery) =>{
        gallery.addEventListener('click', (event)=>{
            showcase.classList.add('showcase-show');
            if (event.target.classList.contains('gallery-item')) {
                const src = event.target.childNodes[1].src;
                document.querySelector('.showcase-img').src = src;
            }
        })
    })
})();

const closeShowGallery = (()=>{
    const close = document.querySelector('.showcase-close');
    close.addEventListener('click', ()=>{
        document.querySelector('.showcase').classList.remove('showcase-show');
    })
})();