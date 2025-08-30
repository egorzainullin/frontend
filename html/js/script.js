// Простой JavaScript файл
console.log('Привет мир!');

// Добавляем простое взаимодействие
document.addEventListener('DOMContentLoaded', function() {
    const helloWorld = document.getElementById('hello-world');
    
    helloWorld.addEventListener('click', function() {
        alert('Привет! Вы кликнули на "Привет мир"!');
    });
}); 