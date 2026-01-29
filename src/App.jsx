import { useState, useCallback, useEffect, useRef } from 'react'



function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  //useRef hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
      
    }

    setPassword(pass)


  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])
return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black px-4">
    <div className="w-full max-w-md bg-gray-800/90 backdrop-blur-lg border border-gray-700 rounded-2xl shadow-2xl p-6">

      {/* Title */}
      <h1 className="text-2xl font-semibold text-center text-white mb-6">
        🔐 Password Generator
      </h1>

      {/* Password Input */}
      <div className="flex items-center bg-gray-900 rounded-xl overflow-hidden mb-5 border border-gray-700 focus-within:ring-2 focus-within:ring-blue-500">
        <input
          type="text"
          value={password}
          readOnly
          ref={passwordRef}
          className="w-full bg-transparent px-4 py-2 text-orange-400 tracking-wider outline-none"
          placeholder="Password"
        />
        <button
          onClick={copyPasswordToClipboard}
          className="bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all px-4 py-2 text-white font-medium"
        >
          Copy
        </button>
      </div>

      {/* Controls */}
      <div className="space-y-4 text-sm text-gray-300">

        {/* Length Slider */}
        <div>
          <label className="flex justify-between mb-1">
            <span>Password Length</span>
            <span className="text-orange-400 font-semibold">{length}</span>
          </label>
          <input
            type="range"
            min={6}
            max={25}
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="w-full accent-blue-500 cursor-pointer"
          />
        </div>

        {/* Checkboxes */}
        <div className="flex justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              onChange={() => setNumberAllowed(prev => !prev)}
              className="accent-orange-500 w-4 h-4"
            />
            Include Numbers
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              onChange={() => setCharAllowed(prev => !prev)}
              className="accent-orange-500 w-4 h-4"
            />
            Special Characters
          </label>
        </div>
      </div>
    </div>
  </div>
)

}

export default App