server_file=server.js
start_node_cmd="nohup node $server_file >> nodetest.out &"
echo $start_node_cmd

echo 'There is a change in file, restarting node'
ps | grep "[n]ode $server_file$" | awk '
{
	if($1!="") {
		print "killing process: "$1; 
		system("kill " $1)
	}
}' 

echo "starting server"
eval "$start_node_cmd"
