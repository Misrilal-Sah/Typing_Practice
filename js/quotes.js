const quotes = [
    "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    "Believe you can and you're halfway there.",
    "The only way to do great work is to love what you do.",
    "Don't watch the clock; do what it does. Keep going.",
    "The future depends on what you do today.",
    "Your talent determines what you can do. Your motivation determines how much you are willing to do. Your attitude determines how well you do it.",
    "The harder you work for something, the greater you'll feel when you achieve it.",
    "It always seems impossible until it's done.",
    "The secret of getting ahead is getting started.",
    "Quality is not an act, it is a habit.",
    "Your life does not get better by chance, it gets better by change.",
    "The difference between ordinary and extraordinary is that little extra.",
    "Perfection is not attainable, but if we chase perfection we can catch excellence.",
    "The only limit to our realization of tomorrow is our doubts of today.",
    "The way to get started is to quit talking and begin doing.",
    "Don't let yesterday take up too much of today.",
    "You are never too old to set another goal or to dream a new dream.",
    "Nothing is impossible. The word itself says 'I'm possible!'",
    "You don't have to be great to start, but you have to start to be great.",
    "The best way to predict the future is to create it.",
    "The journey of a thousand miles begins with one step.",
    "Success is not how high you have climbed, but how you make a positive difference to the world.",
    "You miss 100% of the shots you don't take.",
    "The more you practice, the better you get, the more freedom you have to create.",
    "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle.",
    "Productivity is never an accident. It is always the result of a commitment to excellence, intelligent planning, and focused effort.",
    "The only person you are destined to become is the person you decide to be.",
    "To improve is to change; to be perfect is to change often.",
    "The future rewards those who press on. I don't have time to feel sorry for myself. I don't have time to complain. I'm going to press on.",
    "Never give up on a dream just because of the time it will take to accomplish it. The time will pass anyway."
];

function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
} 