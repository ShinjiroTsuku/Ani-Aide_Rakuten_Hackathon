// src/components/victim/RequestPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RequestPage.css';

// バックエンドのベース URL
const API_BASE = 'http://localhost:8000';

// 定数定義
const ANIMAL_TYPES       = ["犬","猫","ハムスター","インコ"];
const DOG_BREEDS         = ["チワワ","トイプードル","柴犬","ミニチュアダックス"];
const CAT_BREEDS         = ["スコティッシュフォールド","マンチカン","アメリカンショートヘア"];
const DOG_SIZES          = ["小型犬","中型犬","大型犬"];
const LIFE_STAGES        = ["子犬","成犬","シニア"];
const ALLERGY_OPTIONS    = { yes:"あり", no:"なし" };
const SUPPORT_CATEGORIES = { food:"食べ物", medicine:"薬・サプリ", supplies:"生活用品", toys:"おもちゃ" };
const SORT_OPTIONS       = { "-reviewCount":"人気順", "-itemPrice":"価格が高い順", "+itemPrice":"価格が安い順", "-updateTimestamp":"新着順" };

export default function RequestPage() {
  const navigate = useNavigate();

  // ── 検索条件ステート ──
  const [keyword, setKeyword]                   = useState("");
  const [selectedAnimal, setSelectedAnimal]     = useState("");
  const [selectedBreed, setSelectedBreed]       = useState("");
  const [selectedDogSize, setSelectedDogSize]   = useState("");
  const [selectedLifeStage, setSelectedLifeStage] = useState("");
  const [selectedAllergy, setSelectedAllergy]     = useState("");
  const [selectedCategory, setSelectedCategory]   = useState("");
  const [selectedSort, setSelectedSort]           = useState("-reviewCount");

  // ── 検索結果ステート ──
  const [items, setItems] = useState([]);

  // ── モーダル制御ステート ──
  const [isModalOpen, setIsModalOpen]     = useState(false);
  const [modalItem, setModalItem]         = useState(null);
  const [loadingModal, setLoadingModal]   = useState(false);
  const [requestStatus, setRequestStatus] = useState("");

  // ── アイテム検索 & ソート ──
  const fetchItems = async () => {
    try {
      const params = new URLSearchParams();
      if (selectedAnimal)    params.append("animal",    selectedAnimal);
      if (selectedBreed)     params.append("breed",     selectedBreed);
      if (selectedDogSize)   params.append("dog_size",  selectedDogSize);
      if (selectedLifeStage) params.append("life_stage",selectedLifeStage);
      if (selectedAllergy)   params.append("allergy",   selectedAllergy);
      if (selectedCategory)  params.append("category",  selectedCategory);
      if (keyword)           params.append("keyword",   keyword);
      if (selectedSort)      params.append("sort",      selectedSort);

      const res  = await fetch(`${API_BASE}/api/victim/api?${params}`);
      const data = await res.json();
      if (!Array.isArray(data)) throw new Error("レスポンスが配列形式ではありません");

      // クライアント側で並び替え
      const sorted = [...data].sort((a, b) => {
        switch (selectedSort) {
          case '-reviewCount':
            return (b.review_count||0) - (a.review_count||0);
          case '-itemPrice':
            return (b.price||0) - (a.price||0);
          case '+itemPrice':
            return (a.price||0) - (b.price||0);
          case '-updateTimestamp':
            return new Date(b.updateTimestamp||0) - new Date(a.updateTimestamp||0);
          default:
            return 0;
        }
      });

      setItems(sorted);
    } catch (e) {
      console.error("[Error] アイテム取得エラー:", e);
    }
  };

  // ── モーダル開く＆詳細取得 ──
  const openModal = async (itemCode) => {
    setIsModalOpen(true);
    setLoadingModal(true);
    setModalItem(null);
    setRequestStatus("");
    try {
      const code = encodeURIComponent(itemCode);
      const res  = await fetch(`${API_BASE}/api/victim/api/item/${code}`);
      if (!res.ok) throw new Error(`商品情報の取得に失敗しました (${res.status})`);
      setModalItem(await res.json());
    } catch (e) {
      console.error(e);
      setModalItem({ error: e.message });
    } finally {
      setLoadingModal(false);
    }
  };

  // ── モーダルを閉じる ──
  const closeModal = () => {
    setIsModalOpen(false);
    setModalItem(null);
    setRequestStatus("");
  };

  // ── 依頼送信 ──
  const handleRequest = async () => {
    if (!modalItem || modalItem.error) return;
    try {
      const res = await fetch(`${API_BASE}/api/victim/api/request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          item_code:  modalItem.item_code,
          item_name:  modalItem.name,
          item_price: modalItem.price,
          shop_name:  modalItem.shop
        })
      });
      if (!res.ok) throw new Error(`依頼送信失敗 (${res.status})`);
      const result = await res.json();
      if (result.status === "success") {
        navigate("/victim/complete");
      } else {
        throw new Error(result.message || "依頼に失敗しました");
      }
    } catch (e) {
      console.error(e);
      setRequestStatus(e.message);
    }
  };

  return (
    <div className="request-page-container">
      {/* ヘッダー */}
      <div className="victim-header">
        <h1>被災者向けダッシュボード</h1>
        <button className="victim-logout-btn" onClick={() => navigate('/')}>
          ログアウト
        </button>
      </div>

      {/* 検索フォーム */}
      <div className="card search-card">
        <div className="search-grid">
          <div>
            <label>動物の種類</label>
            <select value={selectedAnimal} onChange={e => { setSelectedAnimal(e.target.value); setSelectedBreed(""); }}>
              <option value="">すべて</option>
              {ANIMAL_TYPES.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>
          <div>
            <label>キーワード</label>
            <input
              className="keyword-input"
              type="text"
              placeholder="例: おもちゃ"
              value={keyword}
              onChange={e => setKeyword(e.target.value)}
            />
          </div>
          <div>
            <label>支援カテゴリ</label>
            <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
              <option value="">すべて</option>
              {Object.entries(SUPPORT_CATEGORIES).map(([k,v]) => (
                <option key={k} value={k}>{v}</option>
              ))}
            </select>
          </div>
          <div>
            <label>並び順</label>
            <select value={selectedSort} onChange={e => setSelectedSort(e.target.value)}>
              {Object.entries(SORT_OPTIONS).map(([k,v]) => (
                <option key={k} value={k}>{v}</option>
              ))}
            </select>
          </div>

          {selectedAnimal === "犬" && (
            <>
              <div>
                <label>アレルギー有無</label>
                <select value={selectedAllergy} onChange={e => setSelectedAllergy(e.target.value)}>
                  <option value="">指定なし</option>
                  {Object.entries(ALLERGY_OPTIONS).map(([k,v]) => (
                    <option key={k} value={k}>{v}</option>
                  ))}
                </select>
              </div>
              <div>
                <label>犬のサイズ</label>
                <select value={selectedDogSize} onChange={e => setSelectedDogSize(e.target.value)}>
                  <option value="">サイズ指定なし</option>
                  {DOG_SIZES.map(sz => <option key={sz} value={sz}>{sz}</option>)}
                </select>
              </div>
              <div>
                <label>ライフステージ</label>
                <select value={selectedLifeStage} onChange={e => setSelectedLifeStage(e.target.value)}>
                  <option value="">ステージ指定なし</option>
                  {LIFE_STAGES.map(ls => <option key={ls} value={ls}>{ls}</option>)}
                </select>
              </div>
              <div>
                <label>犬種</label>
                <select value={selectedBreed} onChange={e => setSelectedBreed(e.target.value)}>
                  <option value="">すべての犬種</option>
                  {DOG_BREEDS.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
            </>
          )}

          {selectedAnimal === "猫" && (
            <div>
              <label>猫種</label>
              <select value={selectedBreed} onChange={e => setSelectedBreed(e.target.value)}>
                <option value="">すべての猫種</option>
                {CAT_BREEDS.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
          )}
        </div>

        <div className="search-actions">
          <button className="search-btn" onClick={fetchItems}>検索する</button>
        </div>
      </div>

      {/* 検索結果一覧 */}
      <div className="item-grid">
        {items.map(item => (
          <div key={item.item_code} className="item-card" onClick={() => openModal(item.item_code)}>
            <img src={item.image} alt={item.name} />
            <div className="item-details">
              <h3>{item.name}</h3>
              <p className="price">¥{new Intl.NumberFormat('ja-JP').format(item.price)}</p>
              <p>レビュー: {item.review_count}件 / 平均: {parseFloat(item.review_average).toFixed(2)} ★</p>
              <p>ショップ: {item.shop}</p>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && closeModal()}>
          <div className="modal">
            <div className="modal-header">
              <h2>商品詳細</h2>
              <button onClick={closeModal}>&times;</button>
            </div>
            <div className="modal-body">
              {loadingModal ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
                </div>
              ) : modalItem.error ? (
                <p className="victim-text text-red-500">{modalItem.error}</p>
              ) : (
                <>
                  <img src={modalItem.image} alt={modalItem.name} />
                  <h3>{modalItem.name}</h3>
                  <p>ショップ: {modalItem.shop}</p>
                  <p className="price">¥{new Intl.NumberFormat('ja-JP').format(modalItem.price)}</p>
                  <p>レビュー: {modalItem.review_count}件 / 平均: {parseFloat(modalItem.review_average).toFixed(2)} ★</p>
                </>
              )}
            </div>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={closeModal}>キャンセル</button>
              <button className="btn-primary" onClick={handleRequest}>これを依頼する</button>
            </div>
            {requestStatus && <p className="request-status">{requestStatus}</p>}
          </div>
        </div>
      )}
    </div>
  );
}
