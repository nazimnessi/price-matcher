import re
import requests
from html.parser import HTMLParser


class TextExtractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.text_parts = []

    def handle_data(self, data):
        self.text_parts.append(data)

    def get_text(self):
        return ' '.join(self.text_parts)


def extract_text(html: str) -> str:
    parser = TextExtractor()
    parser.feed(html)
    return parser.get_text()


def parse_gold_rate_from_text(text: str) -> dict | None:
    normalized = re.sub(r'\s+', ' ', text)
    location_match = re.search(r'Kozhikode', normalized, re.I)
    if not location_match:
        return None

    window = normalized[max(0, location_match.start() - 100): location_match.end() + 300]
    patterns = [
        r'₹\s*([\d,]+(?:\.\d+)?)',
        r'([\d,]+(?:\.\d+)?)\s*₹',
        r'Rs\.?\s*([\d,]+(?:\.\d+)?)',
        r'([\d,]+(?:\.\d+)?)\s*Rs\.?',
    ]
    for pattern in patterns:
        match = re.search(pattern, window)
        if match:
            rate = match.group(1).replace(',', '')
            try:
                return {
                    'location': 'Kozhikode',
                    'rate': float(rate),
                    'currency': 'INR',
                    'unit': 'gram',
                    'source': 'https://www.livegoldkerala.com/kozhikode',
                }
            except ValueError:
                continue

    # As fallback, try a wider search for the first currency value after Kozhikode
    fallback = re.search(r'Kozhikode.*?([₹Rs\s]*[\d,]+(?:\.\d+)?)', normalized, re.I)
    if fallback:
        cleaned = re.sub(r'[₹Rs\.\s]+', '', fallback.group(1))
        cleaned = cleaned.replace(',', '')
        try:
            return {
                'location': 'Kozhikode',
                'rate': float(cleaned),
                'currency': 'INR',
                'unit': 'gram',
                'source': 'https://www.livegoldkerala.com/kozhikode',
            }
        except ValueError:
            pass

    return None


def get_kozhikode_gold_rate() -> dict:
    url = 'https://www.livegoldkerala.com/kozhikode'
    response = requests.get(url, timeout=15)
    response.raise_for_status()
    text = extract_text(response.text)
    parsed = parse_gold_rate_from_text(text)
    if not parsed:
        raise ValueError('Could not parse the Kozhikode gold rate from the remote page.')
    return parsed
