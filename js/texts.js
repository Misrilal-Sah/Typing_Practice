const typingTexts = {
    easy: [
        "The quick brown fox jumps over the lazy dog. This simple sentence contains every letter of the alphabet at least once.",
        "Learning to type quickly and accurately is an essential skill in today's digital world. Practice makes perfect!",
        "Typing is like riding a bicycle. At first, it might seem difficult, but with practice, it becomes second nature.",
        "Regular practice is the key to improving your typing speed and accuracy. Just a few minutes each day can make a big difference.",
        "Focus on accuracy first, then speed. It's better to type slowly and correctly than to make many mistakes while typing fast.",
        "Keep your fingers on the home row keys: A, S, D, F for your left hand and J, K, L, semicolon for your right hand.",
        "Good posture is important when typing. Sit up straight, keep your feet flat on the floor, and position your keyboard at elbow height.",
        "Take short breaks when typing for long periods. Stand up, stretch, and rest your eyes to prevent fatigue and strain."
    ],
    medium: [
        "The journey of a thousand miles begins with a single step. Taking that first step is often the hardest part of any challenging endeavor, but it's essential to making progress.",
        "Technology has revolutionized the way we communicate with each other. From instant messaging to video calls, we can now connect with people around the world in real-time.",
        "Effective time management is crucial for productivity. Prioritizing tasks, setting realistic goals, and avoiding procrastination can help you make the most of your day.",
        "The human brain is incredibly complex, containing approximately 86 billion neurons that form trillions of connections. It's responsible for our thoughts, emotions, and actions.",
        "Climate change is one of the most pressing challenges facing our planet. Rising temperatures, extreme weather events, and melting ice caps are just some of the consequences of global warming.",
        "Regular exercise has numerous benefits for physical and mental health. It can improve cardiovascular fitness, strengthen muscles, boost mood, and reduce the risk of chronic diseases.",
        "Learning a new language opens doors to different cultures and perspectives. It enhances cognitive abilities, improves memory, and creates new opportunities for connection and understanding.",
        "Artificial intelligence is transforming various industries, from healthcare to finance. Machine learning algorithms can analyze vast amounts of data and make predictions with increasing accuracy."
    ],
    hard: [
        "Quantum computing leverages the principles of quantum mechanics to process information in ways that classical computers cannot. Instead of using bits that represent either 0 or 1, quantum computers use quantum bits, or qubits, which can exist in multiple states simultaneously through a phenomenon known as superposition.",
        "The biodiversity of Earth's ecosystems is under threat due to human activities such as deforestation, pollution, and climate change. Conservation efforts are essential to preserve the intricate web of relationships between species that maintain ecological balance and provide crucial services like pollination and water purification.",
        "Neuroplasticity refers to the brain's remarkable ability to reorganize itself by forming new neural connections throughout life. This capability enables the brain to adapt to new situations, recover from injuries, and compensate for disease. Understanding neuroplasticity has revolutionized our approach to rehabilitation and learning.",
        "Cryptocurrency operates on a technology called blockchain, which is a decentralized ledger of all transactions across a peer-to-peer network. This technology allows participants to confirm transactions without the need for a central clearing authority, potentially reducing fraud and increasing transparency.",
        "The development of renewable energy sources such as solar, wind, and hydroelectric power is crucial for transitioning to a sustainable future. These technologies harness natural processes to generate electricity with significantly lower greenhouse gas emissions compared to fossil fuels.",
        "The human genome consists of approximately 3 billion base pairs of DNA, containing all the genetic information needed to build and maintain an organism. The Human Genome Project, completed in 2003, successfully mapped this complex genetic blueprint, revolutionizing our understanding of human biology and disease.",
        "Artificial neural networks, inspired by the biological neural networks in animal brains, form the foundation of many modern machine learning systems. These interconnected nodes process information by responding to external inputs, relaying information between each other, and learning to recognize patterns over time.",
        "The philosophy of existentialism emphasizes individual existence, freedom, and choice. It posits that humans define their own meaning in life, and try to make rational decisions despite existing in an irrational universe. Major existentialist thinkers include Jean-Paul Sartre, Simone de Beauvoir, and Albert Camus."
    ]
};

function getRandomText(difficulty) {
    const texts = typingTexts[difficulty];
    const randomIndex = Math.floor(Math.random() * texts.length);
    return texts[randomIndex];
} 