import requests
import json

# 测试victim API
def test_victim_api():
    base_url = "http://localhost:8000"
    
    # 测试搜索API
    params = {
        "animal": "犬",
        "allergy": "yes",
        "category": "food",
        "sort": "-reviewCount"
    }
    
    try:
        response = requests.get(f"{base_url}/api/victim/api", params=params)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text[:500]}...")  # 只显示前500个字符
        
        if response.status_code == 200:
            data = response.json()
            print(f"Number of items returned: {len(data)}")
            if data:
                print(f"First item: {data[0]}")
        else:
            print(f"Error: {response.text}")
            
    except Exception as e:
        print(f"Exception: {e}")

if __name__ == "__main__":
    test_victim_api()
