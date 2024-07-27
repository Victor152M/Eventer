import psycopg2
import yaml
import gc

def db_operation(sql, params=None, fetch=False):
    connection = None
    result = None
    try:
        with open("app/config.yaml", 'r') as f:
            db_config = yaml.load(f, Loader=yaml.SafeLoader)

        connection = psycopg2.connect(
            database=db_config["postgresql_database"],
            user=db_config["postgresql_user"],
            password=db_config["postgresql_password"],
            host=db_config["postgresql_host"],
            port=db_config["postgresql_port"]
        )

        # Create cursor and execute SQL
        with connection.cursor() as cursor:
            if params:
                cursor.execute(sql, params)
            else:
                cursor.execute(sql)

            # If fetch is True, fetch the data
            if fetch:
                result = cursor.fetchall()
                
        connection.commit()
    
    except(Exception, psycopg2.Error) as error:
        print (f"Error for database operation:  {error}")
        return None

    finally:
        if connection:
            connection.close()
        # garbage collector
        gc.collect()
    
    return result