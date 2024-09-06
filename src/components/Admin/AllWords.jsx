import {useState, useEffect} from 'react';
import {adminfetchWords} from "./hooks/useFetchWords.js";

export default function AllWords() {
    const [words, setWords] = useState([]);

    useEffect(() => {
        const getAllWords = async () => {
            try {
                const response = await adminfetchWords();
                setWords(response);
            } catch (e) {
                console.error('Failed to fetch all words!');
                console.error(e);
            }
        };
        getAllWords();
    }, [])

    return (
        <div>
          <h1>Words List</h1>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Word</th>
              </tr>
            </thead>
            <tbody>
              {words.map(word => (
                <tr key={word.id}>
                  <td>{word.id}</td>
                  <td>{word.word}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
}