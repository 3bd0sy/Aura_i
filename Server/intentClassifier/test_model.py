import fasttext

model = fasttext.load_model("intent_classifier_small.bin")

test_texts = [
    "Good morning! How can I assist you today?",
    "I’m disappointed with the quality of the product I received.",
    "Could you provide more details about this product?",
    "Can you create a high-resolution image of a mountain landscape?",
    "What are the top headlines in the world today?",
    "What is the process of photosynthesis in plants?"
]

print("\nClassification Results:")
for text in test_texts:
    labels, probabilities = model.predict(text, k=1)
    print(f"\nText: '{text}'")
    print(f"Intent: {labels[0].replace('__label__', '')}")
    print(f"Confidence: {probabilities[0]:.2%}")
