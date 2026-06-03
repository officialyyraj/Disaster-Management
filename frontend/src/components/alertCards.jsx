function AlertCard({ type, severity, message }) {

  return (
    <div className="bg-white p-4 rounded-xl shadow-md border mb-4">

      <h2 className="text-xl font-bold">
        {type}
      </h2>

      <p className="text-red-500 font-semibold">
        {severity}
      </p>

      <p className="text-gray-700 mt-2">
        {message}
      </p>

    </div>
  )

}

export default AlertCard