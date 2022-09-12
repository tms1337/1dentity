contract:
  ERC20

------------------------------------------------------------------------

constants:

  # UINT is equivalent to
  # INT where > 0

  INT my:decimals
    where x > 0
  
  INT my:id
    where x > 0

------------------------------------------------------------------------

state:

  ADDR -> INT my:balances
    where x > 0

  ADDR -> ADDR -> INT my:allowances
    where x > 0

  INT my:total_tokens
    where total_tokens > 0

------------------------------------------------------------------------

actors:

  my:OWNERS_G
  my:MINTERS_G
  
  # by default there is ...OTHERS_G
  # by default there is ...ANY_G

------------------------------------------------------------------------

views:

  decimals():
    RETURN my:decimals
  
  id():
    RETURN my:id

  balanceOf():
    inputs:
    
      ADDR a
        where a NOT EQUAL 0x0

    RETURN my:balances[a]

------------------------------------------------------------------------

functions:

  approve():

    inputs:
    -------------------------------------------------------------------

      ADDR in:sender
        where a NOT EQUAL 0x0
     
      ADDR in:receiver
        where a NOT EQUAL 0x0
        where a NOT EQUAL in:sender
      
      INT in:amount
        where x > 0
        where my:balances[in:sender] > x

    pre:
    -------------------------------------------------------------------

      in:sender NOT EQUAL in:receiver
      
      in:caller NOT CONTRACT

    do
    -------------------------------------------------------------------

      # allowed operations
      # ADD, SUB, MUL, DIV?, SET
      # and +OP versions

      my:approvals[in:receiver][in:sender] = in:amount

    post:
    -------------------------------------------------------------------

      my:approvals[x][y] NO CHANGE
        where x NOT IN { in:spender }

      my:approvals[in:receiver][in:sender] INC

      my:approvals[in:sender] NO CHANGE

      # when updating my:state_part
      # also include hash for each state part
      # this way we ensure no change or change
      # so = operator is translated to function call

  transfer():
    inputs:
    -------------------------------------------------------------------

      # by default there is parameter
      # ADDR in:caller
      # which is the address that called the function

      ADDR in:receiver
        where receiver NOT EQUAL caller
        where receiver NOT EQUAL 0x0
      
      INT in:amount
        where amount > 0
        where amount < my:balances[caller]
  
    pre: 
    -------------------------------------------------------------------

      my:balances[in:caller] > in:amount
      in:caller in my:ANY_G

    do:
    -------------------------------------------------------------------

      # int operations safe by default

      my:balances[caller] -- in:amount
      my:balances[receiver] +- in:amount

    post:
    -------------------------------------------------------------------

      balances[x] NOT CHANGED
        for each x NOT IN { caller, receiver }

      total_tokens NOT CHANGED

    -------------------------------------------------------------------

      # by default state chedcks are also run after each call
      # so some safety by default

------------------------------------------------------------------------
