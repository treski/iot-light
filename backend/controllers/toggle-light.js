const toggleLight = () => (req, res) => {
  const { state, id } = req.body

  if (typeof state != 'boolean') {
    return res.status(400).json({ error: 'state is required and must be a boolean'})
  }

  if (typeof id != 'number') {
    return res.status(400).json({ error: 'id is required and must be a number'})
  }

  client.publish(`light/${id.toString()}`, state.toString())

  console.log(`${state ? 'enabl' : 'disabl'}ing light: ${id}`)

  res.status(200).json({
    id: id,
    state: state
  });
  };
  
  module.exports = { toggleLight };