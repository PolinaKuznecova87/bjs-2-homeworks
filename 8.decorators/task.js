//Задача № 1

function cachingDecoratorNew(func) {
	let cache = [];

	function wrapper(...args) {

		const hash = md5(JSON.stringify(args));

		let objectCache = cache.find(item => item.hash === hash); //ищем элементы в кеше по хешу
		if (objectCache) {

			console.log("Из кеша: " + objectCache.value, cache);
			return "Из кеша: " + objectCache.value;
		}
		let result = func(...args);

		cache.push({
			hash: hash,
			value: result
		});

		if (cache.length > 5) {

			cache.shift();
		}
		console.log("Вычисляем: " + result, cache);
		return "Вычисляем: " + result;
	}
	return wrapper;
}



//Задание 2

function debounceDecoratorNew(func, delay) {
	let timeoutId;
	let count = 0; //количество апли
	let allCount = 0; //количество всех оберток

	function wrapper(...args) {
		if (timeoutId) {
			clearTimeout(timeoutId);
			allCount++;
		}

		if (!timeoutId) {
			func.apply(this, args);
			count++;
		}
		timeoutId = setTimeout(() => {
			count++;
			func.apply(this, args);
			wrapper.count = count;
		}, delay);

		wrapper.allCount = allCount;
	}
	return wrapper;
}
