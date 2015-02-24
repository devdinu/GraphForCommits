import json, re, os, sys, pickle
import pdb
from collections import Counter

class MyEncoder(json.JSONEncoder):
	def default(self, obj):
		pdb.set_trace()
		return [str(obj), obj]

class Extractor(object):
	"""docstring for Extractor"""

	def __init__(self, file_location):
		super(Extractor, self).__init__()
		self.filename = file_location
		
	def read_file(self, fname):
		pattern_with_date = re.compile(r'Author:\s*(?P<name>.*)\nDate:\s*(?P<date>.*)')
		author_pattern = re.compile(r'Author:\s*(?P<name>.*)')

		with open(fname) as input_file:
			commits = input_file.read()		
		all=author_pattern.findall(commits)
		count = Counter(all)
		# print count.items()
		final_list=[]
		for key, value in count.items():
			final_list.append([str(key),value])
		# print(json.dumps(count.items(), cls=MyEncoder))
		# print(json.dumps(count))
		# print MyEncoder().encode(count)
		# print(json.dumps(count.items()))
		print(json.dumps(final_list))

	def extract_data(self):
		self.read_file(self.filename)


if len(sys.argv)==2:
	extractor = Extractor(sys.argv[1])
else:
	extractor = Extractor('../commits.log')

# pdb.run('extractor.extract_data()')
extractor.extract_data()