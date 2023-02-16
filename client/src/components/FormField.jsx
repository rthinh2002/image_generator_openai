import React from 'react'

const FormField = ({labelName, type, name, placeholder, value, handleChange,
isSurpriseMe, handleSurpriseMe}) => {
  return (
    <div>
      <div className='flex items-center gap-2 mb-2'>
        <label 
          htmlFor={name}
          className='block text-sm font-medium text-gray-900 text-white'
        >
          {labelName}
        </label>
        {isSurpriseMe && (
          <button
            type="button"
            onClick={handleSurpriseMe}
            className="font-semibold text-xs bg-[#d4d5d0] py-1 px-2 rounded-[5px] text-black"
          >
            Get Random Prompt
          </button>
        )}
      </div>
      <input 
          type={type} 
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          required
          className='bg-gray-600 text-gray-100 text-sm rounded-lg outline-none block w-full p-3'
        />
    </div>
  )
}

export default FormField