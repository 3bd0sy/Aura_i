import fasttext

train_data = [
    "__label__inquiry What is the price of the product?",
    "__label__inquiry Can you tell me the cost of this item?",
    "__label__inquiry How much does this product cost?",
    "__label__inquiry Is there any discount on this product?",
    "__label__inquiry What is the total price including taxes?",
    "__label__inquiry Can I get a quote for bulk orders?",
    "__label__inquiry Is there a warranty included with the product?",
    "__label__inquiry What payment methods do you accept?",
    "__label__inquiry Are there any additional fees I should be aware of?",
    "__label__inquiry Can I track my order online?",

    "__label__complaint The product arrived damaged.",
    "__label__complaint I received a broken item in my order.",
    "__label__complaint The item is defective, and I need a replacement.",
    "__label__complaint I am not satisfied with the quality of the product.",
    "__label__complaint My order is incomplete; some items are missing.",
    "__label__complaint My order hasn’t arrived yet.",
    "__label__complaint The product doesn’t match the description.",
    "__label__complaint I want to report a delayed shipment.",
    "__label__complaint The customer service was unhelpful.",
    "__label__complaint The packaging was torn upon arrival.",

    "__label__greeting Hello, how are you?",
    "__label__greeting Hi there! How's it going?",
    "__label__greeting Good morning, how's everything?",
    "__label__greeting Hey! Hope you're doing well.",
    "__label__greeting Hello! Nice to meet you.",
    "__label__greeting Hi there, good to see you!",
    "__label__greeting Greetings! How can I assist you today?",
    "__label__greeting Hey! How’s everything going?",
    "__label__greeting Hello! Hope you’re having a great day.",
    "__label__greeting Good evening, what’s new with you?",

    "__label__generate_image Generate an image of a sunset.",
    "__label__generate_image Create a picture of a forest in the morning.",
    "__label__generate_image Can you make a drawing of a beach at night?",
    "__label__generate_image I need an illustration of a mountain during sunrise.",
    "__label__generate_image Generate a visual of a cityscape at dusk.",
    "__label__generate_image Can you design an image of a futuristic city?",
    "__label__generate_image I need a graphic of a lush green valley.",
    "__label__generate_image Draw me a starry night sky with a comet.",
    "__label__generate_image Create a concept art of a sci-fi spaceship.",
    "__label__generate_image Generate a sketch of a traditional village scene.",

    "__label__latest_news What are the latest news updates?",
    "__label__latest_news Can you share the most recent headlines?",
    "__label__latest_news What’s happening in the world today?",
    "__label__latest_news Show me the breaking news right now.",
    "__label__latest_news Give me an update on today’s top stories.",
    "__label__latest_news What’s the latest in technology news?",
    "__label__latest_news Are there updates on the stock market today?",
    "__label__latest_news Tell me about the trending topics this week.",
    "__label__latest_news Any news about the recent elections?",
    "__label__latest_news What’s the latest update on the weather forecast?",

    "__label__general_question What is the capital of France?",
    "__label__general_question Who invented the telephone?",
    "__label__general_question What’s the tallest mountain in the world?",
    "__label__general_question Can you tell me the population of Germany?",
    "__label__general_question How does photosynthesis work?",
    "__label__general_question How far is the moon from Earth?",
    "__label__general_question Who painted the Mona Lisa?",
    "__label__general_question What is the boiling point of water?",
    "__label__general_question Which country has the largest population?",
    "__label__general_question Why does the sky appear blue?"
]


# with open("train_data.txt", "w", encoding="utf-8") as f:
#     for line in train_data:
#         f.write(line + "\n")

model = fasttext.train_supervised(input="train_data.txt",
                                  epoch=50,
                                  dim=50,
                                  lr=0.1,
                                  wordNgrams=2
                                  )
model.save_model("intent_classifier.bin")

test_texts = [
    "Hello, how are you?",
    "The product arrived damaged.",
    "What is the price of this product?",
    "Generate an image of a beach.",
    "What are the latest news updates?",
    "Who discovered gravity?"
]

print("\nClassification Results:")
for text in test_texts:
    labels, probabilities = model.predict(text, k=1)
    print(f"\nText: '{text}'")
    print(f"Intent: {labels[0].replace('__label__', '')}")
    print(f"Confidence: {probabilities[0]:.2%}")
