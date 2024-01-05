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
	let isTrottled = false;

	function wrapper(...args) {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => {
			func(args);
			wrapper.count++;
		}, delay);
		if (!isTrottled) {
			func(...args);
			wrapper.count++;
			isTrottled = true;
		}
		wrapper.allCount++;
	}
	wrapper.count = 0;
	wrapper.allCount = 0;
	return wrapper;
}
