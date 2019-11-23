
using UnityEngine;
using UnityEngine.SceneManagement;

public class DaFollow : MonoBehaviour {
    public Transform target;
    public float smoothSpeed = 0.2f;
    private Vector3 offset = new Vector3(0, 0.2f, 2f);


    // Use this for initialization
    void Start () {

	}
	
	// Update is called once per frame
	void FixedUpdate () {

        if (SceneManager.GetActiveScene().name.Equals("SampleScene"))
        {
            if (target.transform.position.y < 1.35 && target.transform.position.y > -0.8)
            {
                Vector3 desiredPosition = target.position + offset;
                Vector3 smoothedPosition = Vector3.Lerp(transform.position, desiredPosition, smoothSpeed);
                transform.position = smoothedPosition;
                transform.LookAt(target);
            }
        }
        else
        {

                Vector3 desiredPosition = target.position + offset;
                Vector3 smoothedPosition = Vector3.Lerp(transform.position, desiredPosition, smoothSpeed);
                transform.position = smoothedPosition;
                transform.LookAt(target);
            
        }



    }
}
