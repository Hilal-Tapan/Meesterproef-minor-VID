// JavaScript Document
console.log("Howdy!");

/*********************************************************************/
/* een observer die gaat opletten op de positie van de observedItems */
/*********************************************************************/

// naam mag je zelf bedenken
let theObserver;

// opties voor de observer
let observerOptions = {
	// rootMargin is niet nodig - alles 0px is de default die de observer hanteert
	// threshold: 0 betekent dat de obeserver afgaat als het element meer dan 0% in/uit beeld is
	// threshold: .5 betekent dat de obeserver afgaat als het element meer dan 50% in/uit beeld is
	threshold: 0
};

// de observer aanmaken met de functie en de opties
theObserver = new IntersectionObserver(itemOnOffScreen, observerOptions);





/********************************************************************************/
/* de elementen waarop gelet gaat worden - elementen met de class observed-item */
/********************************************************************************/

// de elementen opzoeken
// dat zijn er meer - dus querySelectorAll
// "observedItems" is daardoor een array (niet een enkel element)
let observedItems = document.querySelectorAll('.observed-item');

// de observer op elk observedItem in de array laten letten
// met een for loop
for (observedItem of observedItems) {
	theObserver.observe(observedItem);
}




/**********************************************************/
/* de functie die uitgevoerd wordt als de observer afgaat */
/**********************************************************/

// elke keer als er een observedItem in of uit beeld gaat
// wordt de itemOnOffScreen function aangeroepen

function itemOnOffScreen(entries) {
	// het entries object bevat ALLE entries die in en buiten beeld gaan
	// dat kunnen er meer zijn
	// bijv. bij snel scrollen, bijv. bij tegelijkertijd 1 in beld en 1 uit beeld
	// dus weer een for loop om ze allemaal te checken
	for (entry of entries) {
		
		// als een element in beeld is gekomen
		if(entry.isIntersecting) {
			// het element opzoeken dat in beeld is gekomen
			let observedItem = entry.target;
			
			// het geluid element dat in de HTML direct na het element komt opzoeken
			let bijbehorendGeluid = observedItem.nextElementSibling;
			// dat geluid afspelen
			bijbehorendGeluid.play();
		}
		
		// anders is het element buiten beeld gegaan
		else {
			// het element opzoeken dat uit beeld is gegaam
			let observedItem = entry.target;
			
			// het geluid element dat in de HTML direct na het element komt opzoeken
			let bijbehorendGeluid = observedItem.nextElementSibling;
			// dat geluid stoppen
			bijbehorendGeluid.pause();
			// het geluid terugspoelen naar de start
			// zodat het weer opnieuw begint als het bijbehorende element weer in beeld komt
			bijbehorendGeluid.currentTime = 0;
		}
	}
	
	
}