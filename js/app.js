//Model
var model = {
	currentCat: null,
	cats : [{
		name: 'Cat 1',
		src: 'images/cat1.jpg',
		count: 0
	},
	{
		name: 'Cat 2',
		src: 'images/cat2.jpg',
		count: 0
	}
	]
};
//Octopus
var octopus = {
	init: function() {
		model.currentCat=model.cats[0];
		catListView.init();
		catView.init();
		//adminView.init();
		
	},
	incrementCount: function() {
		 model.currentCat.count++;
		 catView.render();
	},
	getCurrentCat: function() {
		return model.currentCat;
	},
	getCats: function() {
		return model.cats;
	},
	setCurrentCat: function(cat) {
		model.currentCat=cat;
	},
}
//Views
//This is the cat display view which displays the image of the cat.
var catView = {
	init:function() {
		this.catName=$('#catName');
		this.catImage=$('#catImage');
		this.catCount=$('#clickCat');
		this.catImage.on('click',function() {
			octopus.incrementCount();
		});
		this.render();
	},
	render : function() {
		var catObj = octopus.getCurrentCat();
		this.catName.text(`${catObj.name}`);
		this.catImage.attr('src',`${catObj.src}`);
		this.catCount.text(`${catObj.count}`);
	}
};
var catListView = {
	init: function() {
		this.catList = $('.listCats');
		this.render();
	},
	render: function() {
		var cats=octopus.getCats();
		var cat;
		for(let i=0;i<cats.length;i++) {
			 cat = cats[i];
			 var list = $(`<li class="catItems">${cat.name}</li>`);
			 this.catList.append(list);
			/* Whenever we are adding an event listner in a for lop we should use the concept of closures and immediately 
			invoked functions. This trick is used  to connect the value of the cat variable to the click event function */
			 list.click((function(copyCats){
			 	return function() {
			 		octopus.setCurrentCat(copyCats);
			 		catView.render();
			 	};
			 })(cat));
		}

	}
}

octopus.init();