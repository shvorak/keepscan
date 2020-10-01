KeepScan.com - https://keepscan.com/ - improved explorer for the KEEP network. Fast, Simple & Stylish.
You don't need instructions to use it.

# Key features
 - Has own backend an API with which anyone can access;
 - Detailed information about the deposit and redeem process as a whole with monitoring a bunch of smart-contracts;
 - Ability to open the redemption process in tBTС DApp directly from the operation card;
 - Ability to return to tBTС DApp if you interrupted the operation;
 - Get random TDT ID;
 - Easy switch between mainnet (https://keepscan.com/) and testnet (https://testnet.keepscan.com/);

# Open API information

**Main methods:**
- `{url}/api/network` — information about all available networks: block number, date and time of the last block, etc .;
- `{url}/api/statistic` — network statistics: supply, minted and so on; {url}/api/statistic/deposits — deposits statistics: volume and count by dates;
- `{url}/api/statistic/redeems` — redeem statistics: volume and count by dates;
- `{url}/api/deposit/latest` — extended information about the latest deposits;
- `{url}/api/redeem/latest` — extended information about the latest redeems;
- `{url}/api/deposit?page={page_number}&take={count}` — extended information about all deposits with pagination;
- `{url}/api/redeem?page={page_number}&take={count}` — extended information about all redeems with page pagination.

**Variables:**
- `{url}` — https://keepscan.com/ or https://testnet.keepscan.com/
- `{page_number}` and `{count}` — for pagination

Short description of main features: https://medium.com/@emerido/keepscan-com-improved-explorer-for-the-keep-network-76a5d1ce6059