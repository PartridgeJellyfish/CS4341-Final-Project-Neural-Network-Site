var Layer = function(NeuronNum, AllowedFire) {
  this.NeuronNum = NeuronNum;
  this.AllowedFire = AllowedFire;
  this.inputList = [];
  this.outputList = [];
  this.name = "";
};

Layer.prototype.rename = function(name) {
  this.name = name;
};

Layer.prototype.linkInput = function(input) {
  if(this.inputList.contains(input)) return;
	this.inputList.push(input);
  input.outputList.push(this);
};

Layer.prototype.linkOutput = function(output) {
  if(this.outputList.contains(input)) return;
	this.outputList.push(output);
  output.inputList.push(this);
};

Layer.prototype.generateLayerForLWNN = function() {
  var code = '';
  code += 'Layer ' + this.name + " = Layer(" + this.NeuronNum + "," + this.AllowedFire + ");\n";
  return code;
};

Layer.prototype.generateLinksForLWNN = function() {
  var code = '';
  for (var i = 0, len = this.inputList.length; i < len; i++) {
    code += this.name + ".linkInput(&"+ this.inputList[i].name + ");\n";
  }
  return code;
};

module.exports = {
	Layer : Layer,
};
