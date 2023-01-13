import React, { useState } from "react";

const SearchForm = () => {
// 検索キーワードを保持するためのstate
const [keyword, setKeyword] = useState("");

// 検索ボタンがクリックされたときに実行する処理
const handleSearch = (e) => {
e.preventDefault();

// フォームから入力された検索ワードを取得する
const searchWord = e.target.elements.searchWord.value;

// 有害ワードリストから検索ワードが含まれていないかを確認する
if (harmfulWords.includes(searchWord)) {
  // 有害ワードリストに含まれている場合は、アラートを表示する
  alert("検索できないワードが含まれています");
} else {
  // 有害ワードリストに含まれていない場合は、検索を実行する

  // 検索クエリを作成する
  const query = firestore()
    .collection("tweets")
    .where("text", "array-contains", searchWord);

  // クエリを実行して、検索結果を取得する
  query.get().then((snapshot) => {
    // 検索結果を表示する
    snapshot.forEach((doc) => {
      console.log