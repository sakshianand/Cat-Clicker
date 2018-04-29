$(document).ready(function() {
	let count =0;
	$('.catImage').on('click',function() {
		count++;
		$('.clicks').text(count);
	})
});