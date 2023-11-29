export default `
#efui {
  position: fixed;
  bottom: 0;
  right: 0;
}

.efui__trigger {
  margin: 1rem;
  position: fixed;
  right: 2rem;
  bottom: 4rem;
  z-index: 1001;
}

.efui__components {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  padding: 2rem;
  background-color: black;
  color: white;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

#efui form {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

#efui input {
  padding: 0.5rem;
  min-width: 300px;
  border-radius: 4px;
}

#efui input:focus {
  box-shadow: none;
}

#efui button {
  border-radius: 4px;
  border: 1px solid white;
  padding: 0.5rem 1rem;
  font-weight: 800;
  font-family: inherit;
  color: white;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;
}

#efui button:hover {
  background-color: #646cff;
}

#efui .red {
  color: red;
}

#efui .danger {
  background-color: red;
}

#efui table,
th,
td {
  border: 1px solid lightgray;
  border-collapse: collapse;
  padding: 1rem;
}

#efui table {
  margin-bottom: 4rem;
  width: 80%;
}
`;
